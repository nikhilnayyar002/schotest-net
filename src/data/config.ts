
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
            getCategory:(cid)=>`${domain}/categories/${cid}`,
            getCategoryStates: ()=>`${domain}/categories/states`,
            delete:(cid)=>`${domain}/categories/${cid}`,
        },
        test:{
            postTest: () => `${domain}/tests`,
            getTest: id => `${domain}/tests/${id}`,
            getTestState: id => `${domain}/tests/${id}/state`,
            getQuestionsAnswers: id =>  `${domain}/tests/${id}/completed`,
            getTestsByCategory: (cid, pNo)=> `${domain}/tests/category/${cid}/${pNo}`,
            getTestsByCategoryCount: (cid)=> `${domain}/tests/category/${cid}/count`,
            getTestsCount: ()=> `${domain}/tests/count`,  
            getTests:(pNo)=> `${domain}/tests/all/${pNo}`,
            findTests:()=> `${domain}/tests/find`,
            delete:(id)=>`${domain}/tests/${id}`,
        },
        question:{
            getQuestions: id => `${domain}/questions/test/${id}`,
            postQuestion: () => `${domain}/questions`,
            postQuestions: () => `${domain}/questions/all`,
            getQuestion: id => `${domain}/questions/test/${id}`,
            delete:(id)=>`${domain}/questions/${id}`, 
            deleteAll:(tid)=>`${domain}/questions/all/${tid}`,                      
        },
        instruction:{
            postInstruction: () => `${domain}/instructions`,
            getInstruction: id => `${domain}/instructions/${id}`,
            getInstructionStates: () => `${domain}/instructions/states`,
            getInstructionState: (id) => `${domain}/instructions/${id}/state`,
            getInstructionByCategory: (cid) => `${domain}/instructions/category/${cid}`,
            delete:  id=> `${domain}/instructions/${id}` 
        },
        answer:{
            postAnswer: () => `${domain}/answers`,
            postAnswers: () => `${domain}/answers/all`,
            getAnswers: tid => `${domain}/answers/all/${tid}`,
        },
        images:{
            deleteImage: () => `${domain}/images/delete`,
            postImage: () => `${domain}/images/upload`
        }        
    },
    clientRoutes:{
        root:()=> '/',
        login:()=> '/login',
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
    amplitudeTestRoutes:{
        /** AmplitudeTestResolverService */
        test: (id)=>`/test/${id}`,
        instruction: (id)=> `/test/${id}/instruction`
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
        adminEditCategory: (catID)=> `/admin/category/edit/${catID}`,
        adminTests:()=> "/admin/test",
        adminTestEdit:()=> "/admin/test/edit",
        adminEditTest:(id)=> `/admin/test/edit/${id}`,
        categoryCreate:() => '/admin/category/create',
        testCreate:() => '/admin/test/create',
        adminInstructions:() => '/admin/instruction',
        instructionCreate:() => '/admin/instruction/create',
        adminEditInstruction: (id)=> `/admin/instruction/edit/${id}`
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
    },
    backend:{
        tests:{
            testsPerPage:10
        }
    }
};
export default config;