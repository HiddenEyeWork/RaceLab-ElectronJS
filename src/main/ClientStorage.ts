import Store from "electron-store";

export interface NotificationEntry {
  id: string;
  topic: string;
  message: string;
}

export interface IClientStorage {
  // recentSetups: IRecentSetup[];
  notificationEntries: NotificationEntry[];
}

const schema: any = {
  /*recentSetups: {
    type: "array"
  }*/
  /*foo: {
    type: "number",
    maximum: 100,
    minimum: 1,
    default: 50,
  },
  bar: {
    type: "string",
    format: "url",
  },*/
};

export const ClientStorage = new Store<IClientStorage>({ schema });
