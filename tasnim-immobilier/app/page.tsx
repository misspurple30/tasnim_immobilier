"use client"

import { useState } from "react"
import { Bell, Building, DollarSign, Home, Menu, Search, Users, FileText, AlertCircle } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import ProprietairesTab from "./components/proprietaires-tab"
import ProprietesTab from "./components/proprietes-tab"
import LocatairesTab from "./components/locataires-tab"
import LocationsTab from "./components/locations-tab"
import RecouvrementTab from "./components/recouvrement-tab"
import RapportsTab from "./components/rapports-tab"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const stats = [
    {
      title: "Propriétés totales",
      value: "0",
      change: "+0%",
      icon: Building,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Locations actives",
      value: "0",
      change: "+0%",
      icon: Home,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Recettes du mois",
      value: "0 FCFA",
      change: "+0%",
      icon: DollarSign,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Locataires",
      value: "0",
      change: "+0%",
      icon: Users,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
    },
  ]

  const recentActivities: any[] = []

  const Navigation = () => (
    <nav className="grid items-start px-4 text-sm font-medium">
      <Button
        variant={activeTab === "dashboard" ? "secondary" : "ghost"}
        className="justify-start"
        onClick={() => setActiveTab("dashboard")}
      >
        <Home className="mr-2 h-4 w-4" />
        Tableau de bord
      </Button>
      <Button
        variant={activeTab === "proprietaires" ? "secondary" : "ghost"}
        className="justify-start"
        onClick={() => setActiveTab("proprietaires")}
      >
        <Users className="mr-2 h-4 w-4" />
        Propriétaires
      </Button>
      <Button
        variant={activeTab === "proprietes" ? "secondary" : "ghost"}
        className="justify-start"
        onClick={() => setActiveTab("proprietes")}
      >
        <Building className="mr-2 h-4 w-4" />
        Propriétés
      </Button>
      <Button
        variant={activeTab === "locations" ? "secondary" : "ghost"}
        className="justify-start"
        onClick={() => setActiveTab("locations")}
      >
        <Home className="mr-2 h-4 w-4" />
        Locations
      </Button>
      <Button
        variant={activeTab === "locataires" ? "secondary" : "ghost"}
        className="justify-start"
        onClick={() => setActiveTab("locataires")}
      >
        <Users className="mr-2 h-4 w-4" />
        Locataires
      </Button>
      <Button
        variant={activeTab === "recouvrement" ? "secondary" : "ghost"}
        className="justify-start"
        onClick={() => setActiveTab("recouvrement")}
      >
        <DollarSign className="mr-2 h-4 w-4" />
        Recouvrement
      </Button>
      <Button
        variant={activeTab === "rapports" ? "secondary" : "ghost"}
        className="justify-start"
        onClick={() => setActiveTab("rapports")}
      >
        <FileText className="mr-2 h-4 w-4" />
        Rapports
      </Button>
    </nav>
  )

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6 bg-gradient-to-r from-indigo-600 to-violet-600">
            <Link href="/" className="flex items-center gap-2 font-semibold text-white">
              <Building className="h-6 w-6" />
              <span className="text-lg">TASNIM IMMOBILIER</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <Navigation />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col">
        {/* Header */}
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden bg-transparent">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <div className="flex items-center gap-2 font-semibold mb-4">
                <Building className="h-6 w-6 text-blue-600" />
                <span>TASNIM IMMOBILIER</span>
              </div>
              <Navigation />
            </SheetContent>
          </Sheet>

          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher..."
                  className="w-full bg-background shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>

          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
                <p className="text-muted-foreground">Vue d'ensemble de votre activité immobilière</p>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                      <div className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <p className="text-xs text-gray-500">
                        <span className="text-emerald-600 font-medium">{stat.change}</span> par rapport au mois dernier
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Recent Activities */}
                <Card>
                  <CardHeader>
                    <CardTitle>Activités récentes</CardTitle>
                    <CardDescription>Les dernières activités de votre portefeuille</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivities.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>Aucune activité récente.</p>
                        <p className="text-sm">
                          Les activités apparaîtront ici une fois que vous commencerez à utiliser l'application.
                        </p>
                      </div>
                    ) : (
                      recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {activity.type === "payment" && (
                              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                                <DollarSign className="w-5 h-5 text-white" />
                              </div>
                            )}
                            {activity.type === "contract" && (
                              <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                                <FileText className="w-5 h-5 text-white" />
                              </div>
                            )}
                            {activity.type === "maintenance" && (
                              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-sm">
                                <AlertCircle className="w-5 h-5 text-white" />
                              </div>
                            )}
                            {activity.type === "alert" && (
                              <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-rose-600 rounded-xl flex items-center justify-center shadow-sm">
                                <AlertCircle className="w-5 h-5 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                            <p className="text-sm text-gray-500">{activity.time}</p>
                          </div>
                          {activity.amount && (
                            <div className="text-sm font-medium text-green-600">{activity.amount}</div>
                          )}
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Actions rapides</CardTitle>
                    <CardDescription>Accès rapide aux fonctionnalités principales</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      className="w-full justify-start bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white border-0"
                      onClick={() => setActiveTab("locataires")}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Ajouter un locataire
                    </Button>
                    <Button
                      className="w-full justify-start bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0"
                      onClick={() => setActiveTab("recouvrement")}
                    >
                      <DollarSign className="mr-2 h-4 w-4" />
                      Encaisser un loyer
                    </Button>
                    <Button
                      className="w-full justify-start bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0"
                      onClick={() => setActiveTab("proprietes")}
                    >
                      <Building className="mr-2 h-4 w-4" />
                      Ajouter une propriété
                    </Button>
                    <Button
                      className="w-full justify-start bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white border-0"
                      onClick={() => setActiveTab("rapports")}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Générer un rapport
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "proprietaires" && <ProprietairesTab />}
          {activeTab === "proprietes" && <ProprietesTab />}
          {activeTab === "locations" && <LocationsTab />}
          {activeTab === "locataires" && <LocatairesTab />}
          {activeTab === "recouvrement" && <RecouvrementTab />}
          {activeTab === "rapports" && <RapportsTab />}
        </main>
      </div>
    </div>
  )
}
