/**
 * Created by trieule on 11/30/15.
 */


module.exports = {
	SUCCESS: 200,
	DATABASE_ERROR: 500,
	DATABASE_RETURN_NULL: 501,
	MISSING_ARGUMENT: 502,
	GET_SUCCESS:200,
	LOGIN_SUCCESS: 100,
	LOGIN_FAIL: 101,
	// MISSING_ARGUMENT: 105,
	ASYNC_ERROR: 109,
	STUDENT_LOGIN_SUCCESS: 102,
	GET_QUESTION_SUCCESS: 200,
	GET_TEST_INFO_FAIL:201,
	GET_TEST_INFO_NULL:202,
	GET_QUESTIONS_FAIL: 203,
	GET_QUESTIONS_NULL: 204,
	GET_STUDENT_INFO_SUCCESS:300,
	GET_STUDENT_INFO_FAIL: 301,
	GET_STUDENT_INFO_NULL:302,
	GET_SESSION_INFO_FAIL:303,
	GET_SESSION_INFO_NULL:304,
	TEST_SAVE_SUCCESS: 400,
	TEST_SAVE_FAIL: 401,
	TEST_RECEIVE_ANSWER_NULL:405,
	TEST_ALREADY_SUMMITED: 406,
	TOKEN_GENERATION_FAIL: 110,
	TOKEN_GENERATION_SUCCESS: 111,
	TOKEN_EXPIRED: 112,
	QUESTION_ADD_SUCCESS:500,
	QUESTION_ADD_FAIL:501,
	QUESTION_ADD_NULL:502,
	TEST_ADD_FAIL:503,
	TEST_ADD_SUCCESS:504,
	TEST_ADD_NULL:505,
	TEACHER_LOGIN_SUCCESS:600,
	TEACHER_LOGIN_FAIL:601,
	TEACHER_NOT_FOUND:602,
	REDIS_SAVE_SUCCESS: 700,
	REDIS_SAVE_FAILED: 701,
	REDIS_DEL_TOKEN_FAIL:702,
	REDIS_TIMEOUT : 703,
	ACTIVITY_FEED_SUCCESS: 800,
	ACTIVITY_FEED_FAIL: 801,
	CREATE_TEST_SESSION_FAIL: 802,
	GET_CLASSROOM_FAIL:803,
	GET_CLASSROOM_NULL: 804,
	NO_TEST_IN_CLASSROOM: 820,
	OAG_SAVE_FAIL: 805,
	GET_OAG_FAIL:806,
	ADD_SCORE_FAIL: 807,
	UPDATE_OAG_FAIL: 808,
	UPDATE_SESSION_FAIL: 809,
	SAVE_SESSION_FAIL: 810,
	GET_SCORE_NULL: 811,
	GET_SCORE_FAIL: 812,
	REMOVE_TEST_SESSION: 813,
	UPDATE_CLASSROOM_OBJECTIVE_FAIL: 814,
	EMPTY_DATA_QUERY: 900,
	UPDATE_PASSWORD_FAIL: 901,
	WRONG_PASSWORD: 902,
	PASSWORD_MISMATCH: 903,
	CHANGE_PASS_FAIL:904,
	TEST_SESSION_CLOSED: 905,

	STUDENT_REMOVED: 5027
};
