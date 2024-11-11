

export function Aboutme_01() {
    return (
        <section className="text-red-300 flex gap-2">
            <div>
                <img src="https://avatars.githubusercontent.com/u/69843774?v=4" alt="Profile Picture" className="rounded-full w-24 h-24" />
            </div>
            <div className="flex flex-col">
                <h1 className="text-pretty text-large">John Doe</h1>
                <h2 className="tetx-md">Full Stack Developer</h2>
                <p className="intro-description">I am a full stack developer with experience in React, Node, and Express. I am passionate about creating beautiful and responsive web applications.</p>
            </div>
        </section>
    );
}

export function Aboutme_02() {
    return (
        <section className="bg-orange-400 flex flex-col gap-1">
            <img src="https://avatars.githubusercontent.com/u/69843774?v=4" alt="Profile Picture" className="rounded-full w-24 h-24" />
            <div className="p-4">
                <h1 className="intro-title">John Doe</h1>
                <h2 className="intro-subtitle">Full Stack Developer</h2>
                <p className="intro-description">I am a full stack developer with experience in React, Node, and Express. I am passionate about creating beautiful and responsive web applications.</p>
            </div>
        </section>
    );
}

