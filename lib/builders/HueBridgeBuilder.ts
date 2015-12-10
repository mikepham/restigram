/// <reference path="../../typings/tsd.d.ts" />

import {} from "bluebird";
import superagent = require("superagent");
import {SuperAgentRequest, Request, Response} from "superagent";
import {} from "urijs";

import {RestServiceBuilder} from "../RestServiceBuilder";
import {RestServiceOptions} from "../RestServiceOptions";
import {Route} from "../Route";
import {RouteAuth} from "../RouteAuth";
import {RouteInfo} from "../RouteInfo";
import {RouteMethod} from "../RouteMethod";

export class HueBridgeBuilder extends RestServiceBuilder {
  private static nupnp: string = "https://www.meethue.com/api/nupnp";

  constructor(options: RestServiceOptions) {
    super(options);
  }

  public build(url: string): Promise<any> {
    let api = {
      bridges: []
    };

    return this.getBridgeInfo().then(response => {
      let bridges: { id: string, internalipaddress: string }[] = response;
      bridges.forEach(bridge => {
        api.bridges.push(bridge);
        api[bridge.id] = {};
        let address: string = "http://" + bridge.internalipaddress;
        this.buildBridgeCalls(address, api[bridge.id]);
      });

      return api;
    });
  }

  private buildBridgeCalls(url: string, api: any): void {
    this.buildLightRoutes(url, api);
  }

  private buildLightRoutes(url: string, api: any): void {
    const group_name: string = "lights";

    let get_lights: RouteInfo = new RouteInfo();
    get_lights.auth = RouteAuth.None;
    get_lights.group = group_name;
    get_lights.id = "get_lights";
    get_lights.method = RouteMethod.Get;
    get_lights.name = "List Lights";
    get_lights.path = "/api/{username}/lights";
    get_lights.url = url.toString();
    this.route(api, new Route(get_lights));

    let set_light_state: RouteInfo = new RouteInfo();
    set_light_state.auth = RouteAuth.None;
    set_light_state.group = group_name;
    set_light_state.id = "set_light_state";
    set_light_state.method = RouteMethod.Put;
    set_light_state.name = "Set Light State";
    set_light_state.path = "/api/{username}/lights/{lightid}";
    set_light_state.url = url.toString();
    this.route(api, new Route(set_light_state));
  }

  private getBridgeInfo(): Promise<{ id: string, internalipaddress: string }[]> {
    let request = superagent(HueBridgeBuilder.nupnp);

    return new Promise<{ id: string, internalipaddress: string }[]>((resolve, reject) => {
      return request.end((error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.body);
        }
      });
    });
  }
}