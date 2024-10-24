declare namespace API_TYPES {
  type CriteriaListItem = {
    criteriaName:string;
    criteriaWeight:number;
    criteriaType:string;
    description:string;
    criteriaParent:CriteriaListItem;
  } & DefaultItemResponse;
}
