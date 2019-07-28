
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
            authenticate:()=> `${domain}/auth/authenticate`,
            userProfile:()=>  `${domain}/auth/userProfile`,
        },
        category:{
            getCategories: ()=>`${domain}/categories`,
            getCategoryTests:(cid, email)=> `${domain}/categories/${cid}/tests?email=${email}`
        },
        test:{
            getTest: id => `${domain}/tests/${id}`
        }
    },
    clientRoutes:{
        root:()=> '/',
        login:()=> '/login',
        test: (id)=> '/test/'+id,
        dashboard: ()=>  '/dashboard',
        completedTest:(id)=> '/dashboard/completed/'+ id,

        /** DashboardResolverService */
        dashboardCategories: ()=>"/dashboard/category",
        dashboardCategory: (catID)=> `/dashboard/category/${catID}`,
        dashboardPaused:()=> "/dashboard/paused",
        dashboardCompleted: ()=> "/dashboard/completed",
        /** Dashboard -> parent -> html */
        relCategory:()=> './category',
        relfavourite:()=>  './favourite',
        relPaused:()=> './paused',
        relCompleted:()=> './completed',
    }
};
export default config;