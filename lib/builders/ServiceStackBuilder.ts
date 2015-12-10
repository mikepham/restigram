/// <reference path="../../typings/bluebird/bluebird.d.ts" />
/// <reference path="../../typings/cheerio/cheerio.d.ts" />
/// <reference path="../../typings/superagent/superagent.d.ts" />
/// <reference path="../../typings/urijs/urijs.d.ts" />

import {} from "bluebird";
import cheerio = require("cheerio");
import superagent = require("superagent");
import {SuperAgentRequest, Request, Response} from "superagent";
import urijs = require("urijs");

import {RestServiceBuilder} from "../RestServiceBuilder";
import {Route} from "../Route";
import {RouteInfo} from "../RouteInfo";
import {RouteMethod} from "../RouteMethod";
import {ServiceStackOptions} from "./ServiceStackOptions";
import {Utils} from "../Utils";

export class ServiceStackBuilder extends RestServiceBuilder {
  constructor(options: ServiceStackOptions) {
    super(options);
  }

  public build(url: string): Promise<any> {
    return this.buildMetadata(url).then(() => this.api);
  }

  private buildMetadata(url: string): Promise<any> {
    let url_metadata = urijs(url).path("metadata").toString();
    let request = superagent("get", url_metadata).set("content-type", "text/html");

    return new Promise<any>((resolve, reject) => {
      return request.end((error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      })
    }).then(response => {
      // Load the response HTML.
      return cheerio.load(response.text);
    }).then(($: CheerioStatic) => {
      // Parse HTML for operations.
      let operations: Cheerio = $("div.operations table tbody tr");
      let promises: any[] = [];

      for (let index = 0; index < operations.length; index++) {
        let operation: CheerioElement = operations[index];
        let name = $("th", operation).text();
        let path = $("td a[href^=json]", operation).attr("href");

        // NOTE: We have to do it this way, otherwise the query operators
        // will get escaped.
        let url_service = urijs(url)
          .pathname(urijs(path).path())
          .query(urijs(path).query())
          .toString();

        promises.push(this.buildService(url_service, name));
      }
      return Promise.all(promises).then(() => this.api);
    }).catch(error => {
      console.log(error);
      console.trace();
    });
  }

  private buildService(url: string, name: string): Promise<any> {
    let request = superagent("get", url).set("content-type", "text/html");

    return new Promise<any>((resolve, reject) => {
      return request.end((error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    }).then(response => {
      // Load the response HTML.
      return cheerio.load(response.text);
    }).then(($: CheerioStatic) => {
      // Parse HTML for verbs and request object.
      let form = $("form");
      let info = $("table tbody tr", form);

      for (let index = 0; index < info.length; index++) {
        let $info = info[index];
        let $headers = $("th", $info);
        let path = $($headers[1]).text();
        let methods = this.parseVerbs($($headers[0]).text());
        this.buildServiceRoutes(name, path, methods);
      }

      let example = $("div.example div.request pre").text();
    }).catch(error => {
      console.log(error);
      console.trace();
    });
  }

  private buildServiceRoutes(name: string, path: string, methods: RouteMethod[]): void {
    methods.forEach(method => {
      let info = new RouteInfo();
      info.group = name;
      info.id = name + RouteMethod[method];
      info.method = method;
      info.name = name;
      info.path = path;

      this.add(new Route(info));
    });
  }

  private parseVerbs(verbs: string): RouteMethod[] {
    let methods: RouteMethod[] = [];

    if (verbs.toLowerCase() === "all verbs") {
      Object.keys(RouteMethod)
        .filter(key => isNaN(parseInt(key, 10)))
        .forEach(key => {
          let value = RouteMethod[key];
          if (!Utils.contains(methods, value)) {
            methods.push(RouteMethod[key]);
          }
        });
    } else {
      let names = verbs.toLowerCase().split(",");
      names.forEach(name => {
        name = name.trim();
        name = name[0].toUpperCase() + name.substring(1, name.length);
        methods.push(RouteMethod[name]);
      });
    }
    return methods;
  }
}