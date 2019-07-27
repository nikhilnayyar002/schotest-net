
let domain = "http://localhost:3000"
let config = {
    api:{
        domain:domain,
    },
    company:{
        name:"Test Bot"
    },
    routes:{
        userData:{
            getUserTest: (uid,id) => `${domain}/userData/${uid}/tests/${id}`,
            postUserTestQ: uid => `${domain}/userData/${uid}/tests/q`,
            postUserTestT: uid => `${domain}/userData/${uid}/tests/t`,
            getPausedTests:(uid)=>`${domain}/userData/${uid}/tests/paused`,
            getCompletedTests:(uid) => `${domain}/userData/${uid}/tests/completed`
        },
        user:{

        },
        category:{
            getCategories: ()=>`${domain}/categories`,
            getCategoryTests:(cid, email)=> `${domain}/categories/${cid}/tests?email=${email}`


        },
        test:{
            getTest: id => `${domain}/tests/${id}`
        }
    }
};
export default config;