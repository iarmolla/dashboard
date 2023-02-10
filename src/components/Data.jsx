import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, Tooltip, Legend, Bar, YAxis, PieChart, Pie, AreaChart, Area, LineChart, Line } from "recharts"
import { useQuery } from 'react-query'
import { getUsers } from '../services/users'

function Data() {
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    })
    if (isLoading) {
        return (
            <div className="p-4 sm:ml-64 md:mt-14">

            </div>
        )
    }
   
    return (
        <div className="p-4 sm:ml-64 md:mt-4 App">
            <h1 id="test" className="text-gray-500 pb-5 text-center text-2xl">Bar graphic</h1>
            <ResponsiveContainer width="100%" aspect={2}>
                <BarChart
                    data={data}
                    width={'100%'}
                    height={'100%'}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 10,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="4 1" />
                    <XAxis dataKey="id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="salary" fill="#6b48ff" />
                    <Bar dataKey="name" fill="#1ee3cf" />
                </BarChart>
            </ResponsiveContainer>
            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer >
                    <PieChart>
                        <Pie dataKey="salary" data={data} fill="#518fce" label />
                        <Pie dataKey="name" data={data} fill="#518fce" label />
                        <Tooltip />
                    </PieChart>            
                </ResponsiveContainer>
            </div>           
            <h3 className="text-gray-500 mb-8 text-center text-2xl">Area graph</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="salary" dataKey="salary" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

        </div>

    )
}

export default Data