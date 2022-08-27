export const createProject = (project) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('projects').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({type: 'CREATE_PROJECT', project});
        }).catch((err) => {
            dispatch({type: 'CREATE_PROJECT_ERROR', err})
        });
    }
};

export const deleteProject = (projectId, userId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('projects').doc(projectId).get().then(doc =>{
            const docData = doc.data();
            if(docData.authorId === userId){
                firestore.collection('projects').doc(projectId).delete().then(()=>{
                    console.log('Collection Deleted');
                    dispatch({type: 'DELETE_SUCCESS'});
                }).catch(err => {
                    console.log('Collection delete error', err);
                    dispatch({type: 'DELETE_ERROR', err});
                })
            }
        })
    }
}

export const editProject = (projectId, project) => {
    console.log('updateProductAction', project)
    console.log('productID ',projectId)
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('projects').doc(projectId).update({
            content: project.content,
            title: project.title
        }).then(() => {
            console.log('Project edited');
            dispatch({type: 'EDIT_SUCCESS'});
        }).catch(err => {
            console.log('Project edit error');
            dispatch({type: 'EDIT_ERROR', err});
        });
    }
}