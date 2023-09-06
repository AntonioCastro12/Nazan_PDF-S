import { ListFavorites, ListHistoric } from "src/app/layout/config/layout-manager/models/bookmarks.model";
import { Store } from "./store.model";

export class CommonState {
  stores: Store[] = [];
  favorites: ListFavorites[] = [];
  historic: ListHistoric[] = [];

}
