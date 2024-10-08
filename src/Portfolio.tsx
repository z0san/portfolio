import React, { useEffect, useState } from "react"
import Hero from "./components/Hero"
import MainContent from "./components/MainContent"

const Portfolio = () => {
	const [theme, setTheme] = useState("dark" as "dark" | "light")
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		const localTheme = localStorage.getItem("theme")
		if (localTheme === "dark" || localTheme === "light") {
			setTheme(localTheme as "dark" | "light")
		} else {
			// no theme found in local storage, search for system preference
			const lightModeMediaQuery = window.matchMedia(
				"(prefers-color-scheme: light)"
			)

			// default to dark if both false
			setTheme(lightModeMediaQuery.matches ? "light" : "dark")
		}

		setIsLoaded(true)
	}, [])

	useEffect(() => {
		if (!isLoaded) return
		localStorage.setItem("theme", theme)
	}, [theme, isLoaded])

	return (
		<div
			className={`${
				theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
			}  min-h-screen flex flex-col xl:flex-row w-full`}
		>
			<div className="xl:w-1/2 xl:fixed top-0 left-0">
				<Hero theme={theme} setTheme={setTheme} />
			</div>
			<div className="w-full xl:w-1/2 xl:ml-[50%]">
				<MainContent theme={theme} />
			</div>
		</div>
	)
}

export default Portfolio
