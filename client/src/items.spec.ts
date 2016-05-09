import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders,
  beforeEach} from '@angular/core/testing';
import { provide } from '@angular/core';
import { HTTP_PROVIDERS, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { ItemsService } from './items';
import {MockBackend, MockConnection} from '@angular/http/testing';

describe('ItemsService', () => {
  let service, backend, http, setConnection;

  beforeEachProviders(() => [
    ItemsService, HTTP_PROVIDERS, provide(XHRBackend, {useClass: MockBackend})
  ]);

  beforeEach(inject([ItemsService, XHRBackend, Http], (ItemsService, mockBackend, Http) => {
    service = ItemsService;
    backend = mockBackend;
    http = Http;

    setConnection = (options): void => {
      let responseOptions = { body: options};

      backend.connections.subscribe((connection: MockConnection) => {
        connection.mockRespond(
          new Response(
            new ResponseOptions(responseOptions)
          )
        );
      });
    };
  }));

  it('#loadItems', () => {
    let requestBody = {id: 1, name: 'First Item'};

    setConnection(requestBody);
    spyOn(http, 'get').and.callThrough();

    service.loadItems()
      .then((res) => {
        expect(http.get).toHaveBeenCalled();
        expect(res).toEqual(requestBody);
      });
  });

  it('#saveItem', () => {
    let newItem = { id: undefined, name: 'New Item', description: 'Description' },
        existingItem = { id: 1, name: 'Existing Item', description: 'Description' };

    spyOn(service, 'createItem').and.callThrough();
    spyOn(service, 'updateItem');

    service.saveItem(newItem);

    expect(service.createItem).toHaveBeenCalled();
    expect(service.updateItem).not.toHaveBeenCalled();

    service.saveItem(existingItem);

    expect(service.createItem.calls.count()).toEqual(1);
    expect(service.updateItem).toHaveBeenCalled();
  });

  it('#createItem', () => {
    let requestBody = { id: 1, name: 'First Item', description: 'Described' };

    setConnection(requestBody);
    spyOn(http, 'post').and.callThrough();

    service.createItem(requestBody)
      .then((res) => {
        expect(http.post.calls.argsFor(0).length).toBe(3);
        expect(res).toEqual(requestBody);
      });
  });

  it('#updateItem', () => {
    let requestBody = { id: 1, name: 'First Item Updated', description: 'Described' };

    setConnection(requestBody);
    spyOn(http, 'put').and.callThrough();

    service.updateItem(requestBody)
      .then((res) => {
        expect(http.put.calls.argsFor(0).length).toBe(3);
        expect(res).toEqual(requestBody);
      });
  });

  it('#deleteItem', () => {
    setConnection(undefined);
    spyOn(http, 'delete').and.callThrough();

    let deletedItem = { id: 1, name: 'First Item Updated', description: 'Described' };
    service.deleteItem(deletedItem)
      .then((res) => {
        expect(http.delete.calls.argsFor(0).length).toBe(1);
        expect(res).toBeUndefined();
      });
  });
});
