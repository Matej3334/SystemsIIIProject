import TabItem from './TabItem';
import "./styles"

function TabContainer({children}){

    return(
        <div className='tab-navigator'>
            <div className='tab-container'>
                {
                    getTabs().map( ({text,url}) => <TabItem 
                    key={text}
                    text={text} 
                    url={url} />)
                }
            </div>
            {children}
        </div>
    )
}

const getTabs = () => {
    return [
        {
            text: 'Home',
            url: '/home',
        },
        {
            text: 'Tableview',
            url: '/map',
        }
    ]
}
export default TabContainer;