import { Project } from "../data/projectsData";
import { projectsData } from "../data/projectsData";

export default function Projects() {
    return (
        <section className="w-full text-white py-16 mb-55 md:mb-10 px-6 md:px-12 relative z-10">
            <div className="max-w-7xl mx-auto">

                <div className="mb-12 text-center md:text-left">
                    <span className="text-[#00f0ff] font-mono text-xs tracking-[0.2em] uppercase block mb-2">
            // Portfolio
                    </span>
                    <div className="relative inline-flex flex-col">
                        <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wide pb-3">
                            My Projects
                        </h2>
                        <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#00f0ff] shadow-[0_0_12px_#00f0ff]"></span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map((project: Project) => {
                        return (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={project.id}
                                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1527]/50 backdrop-blur-md transition-all duration-300 hover:border-[#00f0ff]/40 hover:shadow-[0_0_25px_rgba(0,240,255,0.12)] hover:-translate-y-1"
                            >
                                <div className="absolute top-4 left-4 z-20 rounded-full bg-neutral-950/80 px-3 py-1 text-xs font-mono font-bold text-gray-300 border border-white/10 backdrop-blur-sm group-hover:border-[#00f0ff]/30 group-hover:text-[#00f0ff] transition-colors">
                                    #{String(project.id).padStart(2, '0')}
                                </div>

                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#16223f]/40 border-b border-white/5">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1527]/80 via-transparent to-transparent z-10" />
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://unsplash.com`;
                                        }}
                                    />
                                </div>

                                <div className="flex flex-grow flex-col p-6 z-10 relative">
                                    <h3 className="text-xl font-bold tracking-wide text-white group-hover:text-[#00f0ff] transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="mt-3 text-sm text-gray-400 font-light leading-relaxed flex-grow">
                                        {project.description}
                                    </p>

                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-mono font-medium text-gray-300 transition-colors group-hover:border-[#00f0ff]/20 group-hover:text-white"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
