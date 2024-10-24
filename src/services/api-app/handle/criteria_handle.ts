import {
  addCriteria,
  getCriteriaByUuid,
  removeCriteriaByUuid,
  updateCriteria,
} from '@/services/api-app/api/criteria_api';
import { message } from 'antd';

export const handleRemoveCriteria = async (uuid: string) => {
  return removeCriteriaByUuid(uuid)
    .then(async (result) => {
      if (result.status === 200) {
        return true;
      } else {
        message.error(result.message);
        return false;
      }
    })
    .catch(async () => {
      return false;
    });
};

export const handleRemoveCriteriaList = async (selectedRows: API_TYPES.CriteriaListItem[]) => {
  if (!selectedRows) return true;
  try {
    selectedRows.map((row) =>
      removeCriteriaByUuid(row.uuid).then((value) => {
        if (value.status !== 200) {
          message.error(value.message);
        }
      }),
    );
    // message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    return false;
  }
};

export const handleUpdateCriteria = async (record: API_TYPES.CriteriaListItem) => {
  return updateCriteria(record)
    .then(async (result) => {
      return result.status === 200;
    })
    .catch(async () => {
      return false;
    });
};

export const handleAddCriteria = async (fields: API_TYPES.CriteriaListItem) => {
  return addCriteria({ ...fields })
    .then((result) => {
      if (result.status === 200) {
        return true;
      } else {
        return true;
      }
    })
    .catch(() => {
      return false;
    });
};

export const handleGetCriteriaByUuid = async (uuid: string) => {
  return getCriteriaByUuid(uuid)
    .then((result) => {
      if (result.status === 200) {
        let criteriaDate = [];
        criteriaDate[0] = result.data.fromDate;
        criteriaDate[1] = result.data.toDate;
        result.data['criteriaDate'] = criteriaDate;
        return result;
      } else {
        return result;
      }
    })
    .catch(() => {
      return {} as API_TYPES.DefaultResponse;
    });
};
