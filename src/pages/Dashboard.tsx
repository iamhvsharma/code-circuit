
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MetricCard from '@/components/dashboard/MetricCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Check, Clock, Inbox, Target, Timer, Users } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data for charts
const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 4890 },
  { name: 'Jun', value: 3390 },
];

const taskCompletionData = [
  { name: 'Mon', completed: 10, total: 15 },
  { name: 'Tue', completed: 8, total: 12 },
  { name: 'Wed', completed: 15, total: 15 },
  { name: 'Thu', completed: 12, total: 18 },
  { name: 'Fri', completed: 7, total: 10 },
];

const customerSatisfactionData = [
  { name: 'Very Satisfied', value: 65 },
  { name: 'Satisfied', value: 25 },
  { name: 'Neutral', value: 8 },
  { name: 'Dissatisfied', value: 2 },
];

const COLORS = ['#1B3A4B', '#4B0082', '#6E7578', '#BB86FC'];

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('weekly');

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-28">
        <div className="container mx-auto px-4 mb-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Overview of your business performance</p>
            </div>
            
            <Tabs defaultValue="weekly" className="w-full md:w-auto mt-4 md:mt-0">
              <TabsList>
                <TabsTrigger value="daily" onClick={() => setTimeRange('daily')}>Daily</TabsTrigger>
                <TabsTrigger value="weekly" onClick={() => setTimeRange('weekly')}>Weekly</TabsTrigger>
                <TabsTrigger value="monthly" onClick={() => setTimeRange('monthly')}>Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <MetricCard
              title="Total Revenue"
              value="$24,890"
              change={{ value: 12, positive: true }}
              icon={Target}
            />
            <MetricCard
              title="Total Customers"
              value="1,256"
              change={{ value: 8, positive: true }}
              icon={Users}
            />
            <MetricCard
              title="Tasks Completed"
              value="342"
              change={{ value: 5, positive: true }}
              icon={Check}
            />
            <MetricCard
              title="Average Response Time"
              value="2.4h"
              change={{ value: 10, positive: false }}
              icon={Clock}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for current period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#1B3A4B" 
                        fill="#1B3A4B" 
                        fillOpacity={0.1} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Task Completion</CardTitle>
                <CardDescription>Daily task completion rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={taskCompletionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="total" fill="#E5E7EB" />
                      <Bar dataKey="completed" fill="#4B0082" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest actions across your business</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-6">
                  {[
                    { icon: Inbox, title: 'New lead received', description: 'Sarah Johnson from Acme Inc. requested a demo', time: '10 minutes ago' },
                    { icon: Check, title: 'Task completed', description: 'Alex completed "Update client presentations"', time: '1 hour ago' },
                    { icon: Calendar, title: 'Meeting scheduled', description: 'Strategy meeting with marketing team', time: '2 hours ago' },
                    { icon: Timer, title: 'Project deadline approaching', description: 'Website redesign due in 2 days', time: '5 hours ago' },
                  ].map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <li key={index} className="flex items-start">
                        <div className="mr-4 p-2 bg-primary/10 rounded-full">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{activity.title}</h4>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction</CardTitle>
                <CardDescription>Based on recent feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerSatisfactionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {customerSatisfactionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
