import type {  NewsType } from"../constants/NewsType";
import {  NeDBApi } from "./NeDBApi";
import * as path from 'path';
import * as appRoot from 'app-root-path'

const NEWS_DB_PATH= path.join(appRoot.path, 'static/news.db')

export class NewsDb extends NeDBApi<NewsType>{
  constructor() {
    super(NEWS_DB_PATH)
  }
}