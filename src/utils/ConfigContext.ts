import React from 'react'
interface AppConfig {
    serverURL: string
}
export const config: AppConfig = {
    serverURL: 'http://localhost:5000/' 
}
const ConfigContext = React.createContext(config)

export const ConfigProvider = ConfigContext.Provider
export const ConfigConsumer = ConfigContext.Consumer;

export default ConfigContext


