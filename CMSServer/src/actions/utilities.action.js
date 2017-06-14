import * as types from '../constants/AppConstants';

export function changeStatus(data) {
	return {
		type: types.DISABLE_BUTTON_STATUS_CHANGED,
		reload: data.reload,
		status: data.status
	};
}
