import { ListFavorites, ListHistoric } from "../../home-manager/models/bookmarks.model";
import { Store } from "./store.model";

export class CommonState {
  stores: Store[] = [];
  favorites: ListFavorites[] = [];
  historic: ListHistoric[] = [];

}
