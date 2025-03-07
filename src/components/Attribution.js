import { Box, Link, } from '@mui/material';
import { getBaseURL } from '../constants';
import { useEffect, useState } from 'react';
import { NFTContract } from '../contract';
import { useEmbed } from "../hooks/useEmbed";

export const Attribution = (props) => {
    const [attributionText, setAttributionText] = useState("Widget by Buildship")
    const [isBuildshipUser, setIsBuildshipUser] = useState(false)
    const embed = useEmbed()

    const updateAttribution = async () => {
        try {
            if (Object.keys(NFTContract.methods).includes("DEVELOPER")) {
                const developer = await NFTContract.methods.DEVELOPER().call()
                console.log(developer)
                if (developer.toLowerCase().includes("buildship")) {
                    setAttributionText(_ => "Launched with Buildship")
                    setIsBuildshipUser(true)
                } else {
                    setAttributionText(_ => developer)
                    setIsBuildshipUser(false)
                }
            }
        }
        catch (e) {
            console.log("Couldn't read contract developer")
            console.log(e)
        }
    }

    useEffect(() => {
        updateAttribution()
    }, [])

    useEffect(() => {
        if (embed?.watermark_enabled === false) {
            document.querySelector(".attribution-link").style.display = "none"
        }
    }, [embed])

    if (embed?.watermark_enabled === false) {
        return <></>
    }

    return <Box sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column"
        }}>
        <Box
            onClick={() => window.open("https://buildship.xyz")}
            sx={{
                mt: 4,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                ...props?.sx
            }}>
        {/* for SEO */}
        <a href="https://buildship.xyz" >
            BuildShip XYZ
        </a>
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 24,
            height: 24,
            borderRadius: 24,
        }}>
            <img
                width={16}
                height={16}
                src={`${getBaseURL()}/images/buildship${window.STYLES?.theme === "dark" ? "-white" : ""}.svg`}
                alt=""
            />
        </div>
        <Box sx={{
            marginLeft: "2px",
            fontSize: 14,
            fontWeight: 400,
            color: (theme) => theme.palette.grey[500],
        }}>
            {attributionText}
        </Box>
    </Box>
        {isBuildshipUser && <Link sx={{ mt: 1, fontSize: "14px" }} target="_blank" href="https://forms.gle/ytwjDdoGc92YDxhY7">Report fraud</Link>}
    </Box>
}
