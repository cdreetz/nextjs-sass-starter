import * as React from 'react';
import { Sankey, Tooltip, ResponsiveContainer, Legend } from 'recharts';


const initialData = {
    nodes: [
        { name: 'Visit' },
        { name: 'Direct-Favorite' },
        { name: 'Page-Click' },
        { name: 'Detail-Favorite' },
        { name: 'Lost' },
        { name: 'Detail-Click' },
    ],
    links: [
        { source: 0, target: 1, value: 3728 },
        { source: 0, target: 2, value: 6000 },
        { source: 0, target: 3, value: 354170 },
        { source: 3, target: 4, value: 62429 },
        { source: 3, target: 5, value: 291741 },

    ],
}

export default function SankeyChart() {
    const [data, setData] = React.useState(initialData);
    return (
        <ResponsiveContainer width="100%" height={500}>
            <Sankey
                data={data}
                nodePadding={50}
                margin={{ 
                    top: 20, 
                    right: 10, 
                    bottom: 20, 
                    left: 10 
                }}
                link={{ stroke: '#77c878'}}
            >
                <Tooltip />
            </Sankey>
        </ResponsiveContainer>
    )
}