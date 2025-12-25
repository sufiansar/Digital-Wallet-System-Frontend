import{m as o,J as c}from"./index-DTLdg1Qi.js";/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=[["path",{d:"M17 7 7 17",key:"15tmo1"}],["path",{d:"M17 17H7V7",key:"1org7z"}]],u=o("arrow-down-left",i);/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]],k=o("arrow-up-right",y);/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],T=o("chevron-left",d);/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["line",{x1:"19",x2:"5",y1:"5",y2:"19",key:"1x9vlm"}],["circle",{cx:"6.5",cy:"6.5",r:"2.5",key:"4mh3h7"}],["circle",{cx:"17.5",cy:"17.5",r:"2.5",key:"1mdrzq"}]],v=o("percent",p);/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]],A=o("upload",h),l=c.injectEndpoints({endpoints:t=>({getMyTransactions:t.query({query:({page:e=1,limit:r=6,type:n,startDate:a,endDate:s})=>({url:"/transaction/my",method:"GET",params:{page:e,limit:r,...n?{type:n}:{},...a?{startDate:a}:{},...s?{endDate:s}:{}}}),providesTags:["TRANSACTIONS"]}),getAllTransactions:t.query({query:e=>({url:"/transaction/all",method:"GET",params:e}),providesTags:["TRANSACTIONS"]})})}),{useGetMyTransactionsQuery:_,useGetAllTransactionsQuery:N}=l;export{k as A,T as C,v as P,A as U,u as a,N as b,_ as u};
