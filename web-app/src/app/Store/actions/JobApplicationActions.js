export const JobApplicationActionTypes = {
    ADD_JOB_APPLICATION: '[Application] Add a new application', //need to ask
    SET_APPLICATIONS: '[Application] set all application',
    UPDATE_JOB_APPLICATION: '[Application] UPDATE the application', //need to ask
};

export const addJobApplication = (payload) => ({
    type: JobApplicationActionTypes.ADD_JOB_APPLICATION,
    payload
});

export const setJobApplication = (payload) => ({
    type: JobApplicationActionTypes.SET_APPLICATIONS,
    payload
});

export const updateJobApplication = (payload) => ({
    type: JobApplicationActionTypes.UPDATE_JOB_APPLICATION,
    payload
});