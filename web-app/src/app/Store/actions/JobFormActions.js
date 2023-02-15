export const JobFormActionTypes = {
    ADD_JOB: '[Job] Add a new Job',
    ADD_EDUCATION_SKILLS: '[Job] Education to Jobs' , 
    SET_JOB: '[Job] Setting List of Jobs',
    DELETE_JOB: '[Job] Delete a Job',
    UPDATE_JOB: '[Job] Update job',
    SET_CURRENT_JOB: '[Job] Set a job to update',
    VIEW_JOB: '[Job] to view the job'
};

export const addJob = (payload) => ({
    type: JobFormActionTypes.ADD_JOB, payload
});

export const setJobs = (payload) => ({
    type: JobFormActionTypes.SET_JOB, payload
});

export const updateJob = (payload) => ({
    type: JobFormActionTypes.UPDATE_JOB, payload
});

export const deleteJob = (payload) => ({
    type: JobFormActionTypes.DELETE_JOB, payload
});

export const setCurrentJob = (payload) => ({
    type: JobFormActionTypes.SET_CURRENT_JOB, payload
});

export const viewCurrentJob = (payload) => ({
    type: JobFormActionTypes.VIEW_JOB, payload
});


 