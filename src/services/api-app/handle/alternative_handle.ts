import {
  addAlternative,
  getAlternativeByUuid,
  removeAlternativeByUuid,
  updateAlternative,
} from '@/services/api-app/api/alternative_api';
import { message } from 'antd';

export const handleRemoveAlternative = async (uuid: string) => {
  return removeAlternativeByUuid(uuid)
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

export const handleRemoveAlternativeList = async (selectedRows: API_TYPES.AlternativeListItem[]) => {
  if (!selectedRows) return true;
  try {
    selectedRows.map((row) =>
      removeAlternativeByUuid(row.uuid).then((value) => {
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

export const handleUpdateAlternative = async (record: API_TYPES.AlternativeListItem) => {
  return updateAlternative(record)
    .then(async (result) => {
      return result.status === 200;
    })
    .catch(async () => {
      return false;
    });
};

export const handleAddAlternative = async (fields: API_TYPES.AlternativeListItem) => {
  return addAlternative({ ...fields })
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

export const handleGetAlternativeByUuid = async (uuid: string) => {
  return getAlternativeByUuid(uuid)
    .then((result) => {
      if (result.status === 200) {
        return result;
      } else {
        return result;
      }
    })
    .catch(() => {
      return {} as API_TYPES.DefaultResponse;
    });
};
