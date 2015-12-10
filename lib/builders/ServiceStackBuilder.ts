/// <reference path="../../typings/tsd.d.ts" />

import {} from "bluebird";
import cheerio = require("cheerio");
import superagent = require("superagent");
import {SuperAgentRequest, Request, Response} from "superagent";
import urijs = require("urijs");

import {RestServiceBuilder} from "../RestServiceBuilder";
import {Route} from "../Route";
import {RouteInfo} from "../RouteInfo";
import {RouteMethod} from "../RouteMethod";
import {RouteParam} from "../RouteParam";
import {RouteParamInfo} from "../RouteParamInfo";
import {RouteParamKind} from "../RouteParamKind";
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
      let request_example = $("div.example div.request pre").text().match(/{.*}/gm)[0];
      let json = JSON.parse(request_example);

      for (let index = 0; index < info.length; index++) {
        let $info = info[index];
        let $headers = $("th", $info);
        let path = $($headers[1]).text();
        let methods = this.parseVerbs($($headers[0]).text());
        this.buildServiceRoutes(name, path, methods, json);
      }
    }).catch(error => {
      console.log(error);
      console.trace();
    });
  }

  private buildServiceRoutes(name: string, path: string, methods: RouteMethod[], request: any): void {
    methods.forEach(method => {
      let route_info = new RouteInfo();
      route_info.group = name;
      route_info.id = name + RouteMethod[method];
      route_info.method = method;
      route_info.name = name;
      route_info.path = path;

      let params: RouteParam[] = [];

      Utils.variables(path).forEach(variable => {
        let param_info = new RouteParamInfo();
        param_info.kind = RouteParamKind.Url;
        param_info.name = variable;
        param_info.type = "string";
        params.push(new RouteParam(param_info));
      });

      Object.keys(request).forEach(key => {
        let param_info = new RouteParamInfo();
        param_info.kind = RouteParamKind.Request;
        param_info.name = key;
        param_info.type = "any";
        params.push(new RouteParam(param_info));
      });

      this.add(new Route(route_info, params));
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
      Utils.split(verbs).forEach(verb => {
        methods.push(RouteMethod[Utils.capitalize(verb)]);
      });
    }
    return methods;
  }
}