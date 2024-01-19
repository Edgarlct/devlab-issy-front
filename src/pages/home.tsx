import {useEffect, useState} from 'react'
import '../App.css'
import {Chat} from "@mui/icons-material";
import {api} from "../utils/api.ts";
import {Button} from "@mui/material";
import {LinkGenerator} from "../utils/linkGenerator.ts";

function Home() {
  const [open, setOpen] = useState(false)
  const [dataset, setDataset] = useState([])
  const [datasetKey, setDatasetKey] = useState({})
  const [filter, setFilter] = useState<Array<string|null>>([])

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
        {
          dataset.map((dataset: {id:string, name:string}) => {
            return (
              <Button variant="contained" onClick={() => loadDatasetKey(dataset.id)}>{dataset.name}</Button>
            )
          })
        }
      </div>
    )
  }

  const renderDatasetKey = () => {
    let filterKey: string[] = [];
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
        <a href={LinkGenerator.generateLink((datasetKey as {id: string, name: string, firstKey: string, secondKey: string}), filter)} target="_blank" rel="noreferrer">Lien Data Issy</a>
        <Button variant="contained" onClick={() => reset()}>Retour</Button>
      </div>
    )
  }

  return (
    <>
      <div className="container">
        {
          open &&
          <div className="chat-container">
            {dataset.length > 0 && Object.keys(datasetKey).length === 0 && renderDatasets()}
            {Object.keys(datasetKey).length > 0 && filter.length < 2 && renderDatasetKey()}
            {filter.length === 2 && renderLink()}
          </div>
        }
        <div className="chat-button" onClick={()=>setOpen(true)}>
          <Chat/>
        </div>
      </div>
    </>
  )
}

export default Home
