
let domain = "http://localhost:3000"
let config = {
    api:{
        domain:domain,
    },
    company:{
        name:"Schotest",
        url:"https://schotest.com"
    },
    routes:{
        userData:{
            getUserTest: (uid,id) => `${domain}/userData/${uid}/tests/${id}`,
            postUserTestQ: uid => `${domain}/userData/${uid}/tests/q`,
            postUserTestT: uid => `${domain}/userData/${uid}/tests/t`,
            getPausedTests:(uid)=>`${domain}/userData/${uid}/tests/paused`,
            getCompletedTests:(uid) => `${domain}/userData/${uid}/tests/completed`,
            postUserFavourites:(uid) => `${domain}/userData/${uid}/favourites`,
            delUserFavourites:(uid) => `${domain}/userData/${uid}/favourites/delete`,
            getUserFavourites: (uid) =>  `${domain}/userData/${uid}/favourites`
        },
        user:{
            authenticate:()=> `${domain}/auth/authenticate`,
            userProfile:()=>  `${domain}/auth/userProfile`,
        },
        category:{
            getCategories: ()=>`${domain}/categories`,
            postCategory: ()=>`${domain}/categories`,
            getCategoryTests:(cid, email)=> `${domain}/categories/${cid}/tests?email=${email}`,
        },
        test:{
            getTest: id => `${domain}/tests/${id}`,
            getQuestionsAnswers: id =>  `${domain}/tests/${id}/completed`
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
        dashboardCompletedTest: (id)=> `/dashboard/completed/${id}`,
        dashboardFavourites: ()=> "/dashboard/favourite",
        
        /** Dashboard -> parent -> html */
        relCategory:()=> './category',
        relfavourite:()=>  './favourite',
        relPaused:()=> './paused',
        relCompleted:()=> './completed',
    },
    adminRoutes:{
        admin: ()=>  '/admin',

        /** admin -> parent -> html */
        relCategory:()=> './category',
        relTest:()=>  './test',
        relInstruction:()=> './instruction',
        relUser:()=> './user',        

        /** AdminResolverService */
        adminCategories: ()=>"/admin/category",
        adminCategory: (catID)=> `/admin/category/${catID}`,
        dashboardCategoryTests: (catID)=> `/admin/category/${catID}/tests`,    
        adminTests:()=> "/admin/test",
        adminTest:(id)=> `/admin/test/${id}`,
        adminTestQuestions:(id)=> `/admin/test/${id}/questions`,  

        categoryCreate:() => '/admin/category/create'
        


    },
    ckEditor:{
        config:{
            toolbar:[
                "fontFamily", "bold", "italic", "strikethrough", "underline",
                "blockQuote","heading", "link", "numberedList","bulletedList",
                "alignment:left", "alignment:right", "alignment:center", "alignment:justify",
                "alignment", "fontSize"
            ]
        }
    }
};
export default config;