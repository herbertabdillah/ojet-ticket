/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define([
  'ojs/ojcore',
  'knockout',
  'jquery',
  'ojs/ojlistview',
  'ojs/ojinputtext',
  'ojs/ojcollectiontabledatasource',
  'ojs/ojarraytabledatasource',
  'ojs/ojmodel',
  'ojs/ojvalidation-datetime'
], function(oj, ko, $) {
  // 'use strict';
  function TicketDeskViewModel() {
    var self = this;
    self.ticketListDataSource = ko.observable();

    var ticketModelItem = oj.Model.extend({
      idAttribute: 'id'
    });
    var ticketListCollection = new oj.Collection(null, {
      url: "http://localhost:8080/tickets",
      model: ticketModelItem
    });

    self.ticketListDataSource(new oj.CollectionTableDataSource(ticketListCollection));

    self.formatDate = function(date) {
      var formatDate = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME)
        .createConverter(
          {
            'pattern': 'dd/MM/yyyy'
          }
        );
        return formatDate.format(date);
    }
    // tab
    self.selectedTabItem = ko.observable('settings');
    self.tabData = ko.observableArray([
      {
        name: 'Settings',
        id: 'settings'
      },
      {
        name: 'Tools',
        id: 'tools'
      },
      {
        name: 'Base',
        id: 'base'
      },
      {
        name: 'Environment',
        disabled: 'true',
        id: 'environment'
      },
      {
        name: 'Security',
        id: 'security'
      }
    ]);
    self.tabBarDataSource = new oj.ArrayTableDataSource(self.tabData, {idAttribute: 'id'});

    self.deleteTab = function(id) {
      var hnavlist = document.getElementById('ticket-tab-bar');
      var items = self.tabData();
      for(var i = 0; i < items.length; i++) {
        if(items[i].id === id) {
          self.tabData.splice(i, 1);
          oj.Context.getContext(hnavlist)
          .getBusyContext()
          .whenReady()
          .then(function() {
            hnavlist.focus();
          });
          break;
        }
      }
    }
    self.onTabRemove = function(event) {
      self.deleteTab(event.detail.key);
      event.preventDefault();
      event.stopPropagation();
    }
  }
  return TicketDeskViewModel; 
});