import { useEffect, useState } from "react";
import VisibilitySensor from "react-visibility-sensor";

import {
	FaGithub,
	FaLinkedin,
	FaTwitter,
	FaYoutube,
	FaGhost,
} from "react-icons/fa";

import {
	HiDocumentDownload
} from "react-icons/hi";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FcAndroidOs, FcGlobe, FcPhoneAndroid } from "react-icons/fc";
import Masonry from "react-masonry-css";

import {
	Left,
	Right,
	Link,
	Main,
	Skills,
	Page,
	ExperienceCard,
	ProjectCard,
} from "../styles/Styles";
import { themes } from "./_app";
import { getAllSkills } from "../lib/skills";
import { getAllRoles } from "../lib/experience";
import { getAllProjects } from "../lib/projects";

import { Fade, Flip } from "react-reveal";

import { Footer, ThemeButton } from "../components/shared";

export default function Home(props) {
	const [visible, setVisible] = useState({
		skills: false,
		experience: false,
		projects: false,
	});

	const [windowHeight, setWindowHeight] = useState(0);

	if (typeof window !== "undefined") {
		useEffect(() => {
			setWindowHeight(window.innerHeight);
		}, [window.innerHeight]);

		useEffect(() => {
			eval(
				`try {TagCanvas.Start('myCanvas', '', {textColour: '${
					themes[props.theme].fontPrimary
				}',outlineColour: '#0000', imageMode: "both", imagePosition:"top", initial: [0.15,-0.05], fadeIn: 3000, wheelZoom: false, pinchZoom: true, shuffleTags: true, frontSelect: true, textHeight: 18, reverse: true, depth: 0.8,maxSpeed: 0.04, minSpeed: 0.02});} catch(e) {document.getElementById('myCanvasContainer').style.display = 'none';}`
			);
		}, [props.theme]);
	}

	const ToggleTheme = () => {
		if (props.theme === "light") props.setTheme("dark");
		else props.setTheme("light");
	};

	return (
		<Page>
			<ThemeButton toggleTheme={ToggleTheme} theme={props.theme} />
			<Main>
				<Left visibility={visible}>
					<section>
						<h1>Hello, World!</h1>
						<h1>I'm Harsh.</h1>
						<p className="bio" >
						    a Software Engineering Graduate student from{" "}
							
							<a href="https://www.sjsu.edu/" target="_blank">
								San Jose State University
							</a>
							. Skilled in .NET Core, TypeScript, and React. Experienced in full-stack development and cloud computing.
							Passionate about exploring new technologies. Let's connect and collaborate on innovative projects.
							
						</p>
						<div className="headings">
							<a id="link-skills" href="#skills">
								<span>01&nbsp;</span>
								<span className="divider"></span>
								<span>SKILLS</span>
							</a>
							<a id="link-experience" href="#experience">
								<span>02</span>
								<span className="divider"></span>
								<span>EXPERIENCE</span>
							</a>
							<a id="link-projects" href="#projects">
								<span>03</span>
								<span className="divider"></span>
								<span>PROJECTS</span>
							</a>
						</div>
						<div className="profile">
							<img src="/images/profile.jpg" />
							<a href="mailto:harshnaiksjsu@gmail.com">harshnaiksjsu@gmail.com</a>
						</div>
						<div className="details">
							<Link href="https://github.com/autodidact7999" target="_blank">
								<HiDocumentDownload size={18} />
								<span>Resume</span>
								<HiOutlineExternalLink size={16} />
							</Link>
							<Link
								href="https://www.linkedin.com/in/harshnaik7999/"
								target="_blank"
							>
								<FaLinkedin size={18} />
								<span>Linkedin</span>
								<HiOutlineExternalLink size={16} />
							</Link>
						</div>
						
					</section>
				</Left>
				<Right>
					<h1 id="skills">Skills</h1>
					<VisibilitySensor
						partialVisibility
						onChange={(isVisible) => {
							setVisible((visible) => {
								return { ...visible, skills: isVisible };
							});
						}}
						offset={{
							top: windowHeight / 3,
							bottom: windowHeight / 3,
						}}
					>
						<Skills>
							<canvas width="720" height="720" id="myCanvas">
								<p>
									Anything in here will be replaced on browsers that support the
									canvas element
								</p>
								<ul>
									{props.skills.map((skill) => (
										<a
											key={skill.name}
											href="#"
											id={skill.name}
											onClick={(e) => {
												e.preventDefault();
												eval(
													`TagCanvas.TagToFront("myCanvas", {id: "${skill.name}", active: 1});`
												);
											}}
										>
											<li>
												<img
													width="60"
													height="60"
													src={`/images/svg/${skill.image}${
														props.theme === "light" ? "-light" : ""
													}.svg`}
												/>
												{skill.name}
											</li>
										</a>
									))}
								</ul>
							</canvas>
						</Skills>
					</VisibilitySensor>

					<h1 id="experience">Experience</h1>
					<VisibilitySensor
						partialVisibility
						onChange={(isVisible) => {
							setVisible((visible) => {
								return { ...visible, experience: isVisible };
							});
						}}
						offset={{
							top: windowHeight / 3,
							bottom: windowHeight / 3,
						}}
					>
						<section>
							{props.roles.map((role) => (
								<Fade bottom fraction={0.4} key={role.name}>
									<ExperienceCard>
										<header>{role.type}</header>
										<div>
											<img src={`/images/experience/${role.image}`} />
											<h2>{role.name}</h2>
										</div>
										<header className="date">{role.duration}</header>
										<ul>
											{role.description.map((sentence) => (
												<li key={sentence}>{sentence}</li>
											))}
										</ul>
										<a href={role.link} target="_blank">
											<HiOutlineExternalLink size={18} />
										</a>
									</ExperienceCard>
								</Fade>
							))}
						</section>
					</VisibilitySensor>

					<h1 id="projects">Projects</h1>
					<VisibilitySensor
						partialVisibility
						onChange={(isVisible) => {
							setVisible((visible) => {
								return { ...visible, projects: isVisible };
							});
						}}
						offset={{
							top: windowHeight / 3,
							bottom: windowHeight / 3,
						}}
					>
						<Masonry
							breakpointCols={{ default: 1, 916: 1, 749: 2, 529: 1 }}
							className="my-masonry-grid"
							columnClassName="my-masonry-grid_column"
						>
							{props.projects.map((project) => (
								<Flip left fraction={0.4} key={project.name}>
									<ExperienceCard>
										
										<div className="projectHead ">
											<FcGlobe size={24} />
											<h2>{project.name}</h2>
										</div>
										<header className="date"></header>
										<ul>
											
												<li key={project.stack}>{project.stack}</li>
											
										</ul>
										
									</ExperienceCard>
									
								</Flip>
							))}
						</Masonry>
					</VisibilitySensor>
				</Right>
			</Main>
			<Footer />
		</Page>
	);
}

export async function getStaticProps() {
	const skills = getAllSkills();
	const experience = getAllRoles();

	const projects = getAllProjects();

	return {
		props: {
			skills: [...skills.skills],
			roles: [...experience.roles],
			projects: [...projects.projects],
		},
	};
}
