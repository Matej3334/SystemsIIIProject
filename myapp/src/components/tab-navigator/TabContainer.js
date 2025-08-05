import TabItem from './TabItem';


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
            url: '/',
        },
        {
            text: 'Create News',
            url: '/news-create',
        },
        {
            text: 'Login',
            url: '/login',
        },
        {
            text: 'Counter',
            url: '/counter',
        },
    ]
}
export default TabContainer;