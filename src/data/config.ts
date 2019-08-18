import { globalEnvironment} from '../../config/global.config'
const globalConfig:globalEnvironment  = require('../../config/config.json')

let config = {
    company:{
        name:"Schotest",
        url:"https://schotest.com"
    },
    routes:{
        userData:{
            getUserTest: (uid,id) => `${globalConfig.restAPI}/userData/${uid}/tests/${id}`,
            postUserTestQ: uid => `${globalConfig.restAPI}/userData/${uid}/tests/q`,
            postUserTestT: uid => `${globalConfig.restAPI}/userData/${uid}/tests/t`,
            getPausedTests:(uid)=>`${globalConfig.restAPI}/userData/${uid}/tests/paused`,
            getCompletedTests:(uid) => `${globalConfig.restAPI}/userData/${uid}/tests/completed`,
            postUserFavourites:(uid) => `${globalConfig.restAPI}/userData/${uid}/favourites`,
            delUserFavourites:(uid) => `${globalConfig.restAPI}/userData/${uid}/favourites/delete`,
            getUserFavourites: (uid) =>  `${globalConfig.restAPI}/userData/${uid}/favourites`
        },
        user:{
            authenticate:()=> `${globalConfig.restAPI}/auth/authenticate`,
            userProfile:()=>  `${globalConfig.restAPI}/auth/userProfile`,
            register:()=>  `${globalConfig.restAPI}/auth/register`,
        },
        category:{
            getCategories: ()=>`${globalConfig.restAPI}/categories`,
            postCategory: ()=>`${globalConfig.restAPI}/categories`,
            getCategory:(cid)=>`${globalConfig.restAPI}/categories/${cid}`,
            getCategoryStates: ()=>`${globalConfig.restAPI}/categories/states`,
            delete:(cid)=>`${globalConfig.restAPI}/categories/${cid}`,
        },
        test:{
            postTest: () => `${globalConfig.restAPI}/tests`,
            getTest: id => `${globalConfig.restAPI}/tests/${id}`,
            getTestState: id => `${globalConfig.restAPI}/tests/${id}/state`,
            getQuestionsAnswers: id =>  `${globalConfig.restAPI}/tests/${id}/completed`,
            getTestsByCategory: (cid, pNo)=> `${globalConfig.restAPI}/tests/category/${cid}/${pNo}`,
            getTestsByCategoryCount: (cid)=> `${globalConfig.restAPI}/tests/category/${cid}/count`,
            getTestsCount: ()=> `${globalConfig.restAPI}/tests/count`,  
            getTests:(pNo)=> `${globalConfig.restAPI}/tests/all/${pNo}`,
            findTests:()=> `${globalConfig.restAPI}/tests/find`,
            delete:(id)=>`${globalConfig.restAPI}/tests/${id}`,
        },
        question:{
            getQuestions: id => `${globalConfig.restAPI}/questions/test/${id}`,
            postQuestion: () => `${globalConfig.restAPI}/questions`,
            postQuestions: () => `${globalConfig.restAPI}/questions/all`,
            getQuestion: id => `${globalConfig.restAPI}/questions/test/${id}`,
            delete:(id)=>`${globalConfig.restAPI}/questions/${id}`, 
            deleteAll:(tid)=>`${globalConfig.restAPI}/questions/all/${tid}`,                      
        },
        instruction:{
            postInstruction: () => `${globalConfig.restAPI}/instructions`,
            getInstruction: id => `${globalConfig.restAPI}/instructions/${id}`,
            getInstructionStates: () => `${globalConfig.restAPI}/instructions/states`,
            getInstructionByCategory: (cid) => `${globalConfig.restAPI}/instructions/category/${cid}`,
            delete:  id=> `${globalConfig.restAPI}/instructions/${id}` 
        },
        answer:{
            postAnswer: () => `${globalConfig.restAPI}/answers`,
            postAnswers: () => `${globalConfig.restAPI}/answers/all`,
            getAnswers: tid => `${globalConfig.restAPI}/answers/all/${tid}`,
        },
        images:{
            delete: (id) =>`${globalConfig.restAPI}/images/${id}`,
            postImage: (id) => `${globalConfig.restAPI}/images/${id}`
        }        
    },
    /**
     * The purpose of providing routes in config file
     * is that if you change some route name etc
     * you must also edit routes here and all components or services
     * automatically get reflected changes.
     */
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

        adminTests:()=> "/admin/test",
        testCreate:() => '/admin/test/create',
        adminCategories: ()=>"/admin/category",
        categoryCreate:() => '/admin/category/create',
        adminInstructions:() => '/admin/instruction',
        instructionCreate:() => '/admin/instruction/create',        

        /** AdminResolverService */
        adminTestEdit:()=> "/admin/test/edit",
        adminEditTest:(id)=> `/admin/test/edit/${id}`,
        adminEditInstruction: (id)=> `/admin/instruction/edit/${id}`,
        adminEditCategory: (catID)=> `/admin/category/edit/${catID}`,


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
    globalConfig
};
export default config;