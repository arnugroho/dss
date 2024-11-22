import {
  updatePairwise,
} from '@/services/api-app/api/pairwise_api';
import { message } from 'antd';


export const handleUpdatePairwise = async (record: API_TYPES.PairwiseListItem) => {
  return updatePairwise(record)
    .then(async (result) => {
      if (result.status === 200) {
        return true;
      } else {
        message.error(result.message)
        return false;
      }
    })
    .catch(async () => {
      return false;
    });
};

