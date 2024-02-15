import {useEffect, useState} from 'react'
import '../App.css'
import {api} from "../utils/api.ts";
import {Button} from "@mui/material";
import {LinkGenerator} from "../utils/linkGenerator.ts";
import ChatContainer from "../ChatContainer.tsx";

function Home() {
  const [dataset, setDataset] = useState([])
  const [datasetKey, setDatasetKey] = useState({})
  const [filter, setFilter] = useState<Array<string|null>>([])
  const [link, setLink] = useState("https://data.issy.com")

  useEffect(() => {
    loadDatasets()
  }, [])

  const loadDatasets = async () => {
    const datasets = await api.getDatasets()
    setDataset(datasets)
  }

  const loadDatasetKey = async (datasetId: string) => {
    const dataset = await api.getDatasetKey(datasetId)
    setDatasetKey(dataset)
  }

  const reset = () => {
    setDatasetKey({})
    setFilter([])
  }

  const renderDatasets = () => {
    return (
      <div>
        <h4>List des jeux de données</h4>
        <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
          {
            dataset.map((dataset : { id : string, name : string }) => {
              return (
                <Button variant="contained" onClick={() => loadDatasetKey(dataset.id)}>{dataset.name}</Button>
              )
            })
          }
        </div>
      </div>
    )
  }

  const renderDatasetKey = () => {
    let filterKey : string[] = [];
    if (filter.length === 0) {
      filterKey = Object.keys((datasetKey as {keyValues: object}).keyValues)
    } else if (filter.length === 1) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      filterKey = datasetKey.keyValues[filter[0]]
    }
    return (
      <div>
        <h4>List du {filter.length === 0 ? "1er" : "2eme"} filtre</h4>
        <div className={"button-container"}>
          {filter.length > 0 && <Button variant="outlined" onClick={() => setFilter([])}>Retour</Button>}
          {filter.length > 0 && <Button variant="contained" onClick={() => setFilter([...filter, null])}>Aucun</Button>}
          {
            filterKey.map((key: string) => {
              return (
                <Button variant="contained" onClick={() => setFilter([...filter, key])}>{key}</Button>
              )
            })
          }
        </div>
      </div>
    )
  }

  const renderLink = () => {
    return (
      <div className="button-container">
        <h4>Voici le lien vers le jeu de données filtrée</h4>
        <p>Filtres : {filter.join(" ; ")}</p>
        <span onClick={()=>setLink(LinkGenerator.generateLink((datasetKey as {id: string, name: string, firstKey: string, secondKey: string}), filter))}>Lien Data Issy</span>
        <Button variant="contained" onClick={() => reset()}>Retour</Button>
      </div>
    )
  }

  return (
    <>
      <div className="container">
        <iframe title="data-issy" src={link} width="100%" height="100%" />
        <ChatContainer linkChange={(link) => setLink(link)}/>
      </div>
    </>
  )
}

export default Home
