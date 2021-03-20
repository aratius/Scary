import { useApp } from "@inlet/react-pixi";
import { Loader, Texture } from "pixi.js";
import { useEffect, useState } from "react";

export default function Spritesheet(props){

  const url = props.url

  const [fishFrames, setFrames] = useState([])
  const app = useApp()

  useEffect(() => {
    if(!app.loader.resources.data) app.loader.add(url)
    app.loader.load(( _ , resource) => {
      setFrames(
        Object.keys(resource[url].data.frames).map(frame => Texture.from(frame))
      )
    })
  }, [])

  return fishFrames.length && props.children(fishFrames) || null

}