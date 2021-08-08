import { Component, OnInit } from '@angular/core';
import { loadTokens, TokenBalance, TokenData, Tokens } from 'lib/tokens';
import { getPair, getPrice, web3 } from 'lib/web3/web3';
import { TokenList } from 'tokens/tokenlist';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  tokenList: typeof TokenList = TokenList;
  displayTokenList: typeof TokenList.tokens = [];
  tokenPrices: any = TokenData;
  tokenBalances: any = TokenBalance;
  totalWalletAmount: number = 0;
  
  constructor() { }

  async ngOnInit() {
    this.displayTokenList = await loadTokens();
    this.totalWalletAmount = this.displayTokenList.reduce((prev, token) => (TokenBalance[token.address] * TokenData[token.address].price) + prev, 0);

    console.log(this.displayTokenList)
    console.log(this.tokenPrices)
  }

  //$('.ui.search')
  //.search({
    //source: tokenList
  //});

}
