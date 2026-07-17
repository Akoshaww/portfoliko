export interface Project{
    id:number;
    title:string;
    description:string;
    technologies:string[];
    image:string;
    link?:string;
}

export const projectsData: Project[]=[
    {
        id:1,
        title:'Alife',
        description:'Styled Landing-page',
         technologies: ["React", "TypeScript", "Tailwind CSS"],
         image:'/projects/alifeAI.png',
         link:'https://alife-landing.vercel.app'
    },
    {
        id:2,
        title:'Vibrant',
        description:'Styled Landing-page',
         technologies: ["React", "TypeScript", "Tailwind CSS"],
         image:'/projects/vibrant.png',
         link:"https://vibrant-landing.vercel.app"
    },
    {
        id:3,
        title:'Atelier',
        description:'Styled online-market',
         technologies: ["React", "RTK", "TypeScript", "Tailwind CSS"],
         image:'/projects/Atelier.png',
         link:"https://martket-site.vercel.app"
    },
    {
        id:4,
        title:'Repair Tech',
        description:'Styled buisness page',
         technologies: ["React", "TypeScript", "Tailwind CSS"],
         image:'/projects/repaiTech.png',
         link:"https://repair-landing-sage.vercel.app"
    },
    {
        id:5,
        title:'Neuronex',
        description:'Styled Landing-page',
         technologies: ["React", "TypeScript", "Tailwind CSS"],
         image:'/projects/Neuronex.png',
         link:"https://neuronex-two.vercel.app"
    }
]