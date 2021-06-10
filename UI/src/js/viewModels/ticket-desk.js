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
  }
  return TicketDeskViewModel; 
});