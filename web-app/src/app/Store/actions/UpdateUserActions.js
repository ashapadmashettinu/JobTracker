
export const UpdateUserActionTypes = {
    
    UPDATE_USER: '[User] Update an existing user',
    ADD_EDUCATION_SKILLS: '[User] Add education and skills' 

};

export const addEducationSkills = (payload) => ({
    type: UpdateUserActionTypes.ADD_EDUCATION_SKILLS, 
    payload
});

export const updateUser = (payload) => ({
    type: UpdateUserActionTypes.UPDATE_USER,
    payload
})
