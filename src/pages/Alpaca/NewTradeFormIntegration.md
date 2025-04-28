

lets recreate the functionality of (interfaces @SymbolPriceTable.tsx x and @useAlpacaStream ) into the component @NewTrade.tsx  @TradeForm.tsx   @TradeActions.tsx  specifically: we need to resuse: SymbolPriceTableProps

DO NOT RECREATE THE TABLE COMPONENT. we are using SymbolPriceTbleProps to fill form components @TradeForm.tsx  and @TradeActions.tsx 

existing 'symbol' from @TradeForm.tsx  will be the setSymbolInput and setsymbolInput. 

the 'price' from SymbolPriceTableProps output will be exported into the 'price' value for @TradeActions.tsx for new trade inputs in @NewTrade.tsx  

REMEMBER: the 'price' value from NEW SymbolPriceTabl will be the default value for NEW trades only in TradeActions. Allow user to override the price value. Skip the e2e tests and suggest updates


================


edit and update  @NewTrade.tsx  @TradeForm.tsx   @TradeActions.tsx to recreate the functionality of @symbolPricetable.tsx into the forms

allow the user to enter symbol into @tradeform, and the price of @tradeactions.tsx will be the live streamed price from @useAlpacaStream, similar to @symbolpricetable 'price'

DO NOT RECREATE THE TABLE COMPONENT. we are re-using SymbolPriceTbleProps to fill form components @TradeForm.tsx  and @TradeActions.tsx 

existing 'symbol' from @TradeForm.tsx  will be the setSymbolInput and setsymbolInput. 

the 'price' from SymbolPriceTableProps output will be exported into the 'price' value for @TradeActions.tsx for new trade inputs in @NewTrade.tsx  

REMEMBER: the 'price' value from NEW SymbolPriceTabl will be the default value for NEW trades only in TradeActions. Allow user to override the price value. Skip the e2e tests and suggest updates


