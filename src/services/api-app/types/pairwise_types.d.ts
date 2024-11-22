declare namespace API_TYPES {
  type PairwiseListItem = {
    criteria1Id:number;
    criteria2Id:number;
    criteria1:CriteriaListItem;
    criteria2:CriteriaListItem;
    score:number;
  } & DefaultItemResponse;
}
