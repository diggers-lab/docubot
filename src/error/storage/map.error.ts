interface IMapError {
  key: string;
}

const test = 0;

export enum MapErrorEnum {
  KeyAlreadyExists = test,
  KeyDoesNotExist = "Key does not exist",
}

export class MapError extends Error {
  constructor(mapErrorEnum: MapErrorEnum, details: IMapError) {
    super(`${mapErrorEnum}: "${details.key}"`);
  }
}
