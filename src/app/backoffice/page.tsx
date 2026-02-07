"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BadgeCheck,
  Boxes,
  ClipboardList,
  DollarSign,
  Home,
  LayoutDashboard,
  MessageCircle,
  PackageSearch,
  PlusCircle,
  Truck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const navSections = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "catalog", label: "Catálogo", icon: PackageSearch },
  { id: "stock", label: "Stock", icon: Boxes },
  { id: "tracking", label: "Tracking", icon: Truck },
  { id: "notes", label: "Notas", icon: MessageCircle },
];

const kpis = [
  { label: "Pedidos activos", value: "124", delta: "+18%", icon: ClipboardList },
  { label: "Ticket promedio", value: "$ 82.300", delta: "+12%", icon: DollarSign },
  { label: "Reposiciones listas", value: "37", delta: "+8%", icon: Boxes },
  { label: "Alertas críticas", value: "9", delta: "+3", icon: Truck },
];

const revenueTrend = [
  { month: "Ene", amount: 52 },
  { month: "Feb", amount: 64 },
  { month: "Mar", amount: 70 },
  { month: "Abr", amount: 62 },
  { month: "May", amount: 78 },
  { month: "Jun", amount: 83 },
  { month: "Jul", amount: 96 },
  { month: "Ago", amount: 105 },
];

const salesByCategory = [
  { category: "Aros", units: 480 },
  { category: "Collares", units: 360 },
  { category: "Pulseras", units: 325 },
  { category: "Kits", units: 140 },
  { category: "Perlas", units: 220 },
];

const orderStatusData = [
  { label: "Pendiente pago", percent: 24, total: 18 },
  { label: "Preparando", percent: 26, total: 20 },
  { label: "En tránsito", percent: 30, total: 22 },
  { label: "Entregado", percent: 20, total: 15 },
];

const lowStockAlerts = [
  { sku: "AUR-LAY-08", product: "Layering Aura", depot: "CABA", remaining: 24 },
  { sku: "SET-PER-06", product: "Set Perlas Boreal", depot: "CDMX", remaining: 18 },
  { sku: "KIT-VIT-80", product: "Kit Vitrina Premium", depot: "CBA", remaining: 12 },
];

const stuckOrders = [
  { id: "PED-802", retailer: "Galería Norte", status: "Aprobación", time: "36h" },
  { id: "PED-799", retailer: "Live Shopping MX", status: "Despacho", time: "30h" },
  { id: "PED-780", retailer: "Concept Palermo", status: "Pago", time: "42h" },
];

const catalogProducts = [
  {
    id: "SIE-AR-12",
    name: "Pack Argollas Siena",
    category: "Aros",
    price: "$18.900",
    quantity: 120,
    status: true,
  },
  {
    id: "AUR-LAY-08",
    name: "Layering Aura",
    category: "Collares",
    price: "$24.500",
    quantity: 86,
    status: true,
  },
  {
    id: "CAP-PUL-18",
    name: "Mix Pulseras Capri",
    category: "Pulseras",
    price: "$21.700",
    quantity: 140,
    status: true,
  },
  {
    id: "KIT-VIT-80",
    name: "Kit Vitrina Premium",
    category: "Kits",
    price: "$98.500",
    quantity: 22,
    status: false,
  },
];

const warehouses = [
  { id: "CABA", location: "Depósito Parque Patricios", available: 420, reserved: 120 },
  { id: "CBA", location: "Hub Córdoba", available: 280, reserved: 64 },
  { id: "CDMX", location: "Fulfillment México", available: 190, reserved: 22 },
];

const shipments = [
  {
    id: "PED-981",
    retailer: "Alma Mayorista",
    status: "En tránsito",
    carrier: "Andreani",
    eta: "Entrega mañana 10hs",
  },
  {
    id: "PED-982",
    retailer: "Galería Cumbre",
    status: "Hold aduana",
    carrier: "Correo Argentino",
    eta: "Revisión",
  },
  {
    id: "PED-983",
    retailer: "Live Shopping MX",
    status: "Despachado",
    carrier: "FedEx",
    eta: "Entrega hoy 18hs",
  },
];

const notes = [
  {
    title: "Checklist nueva tienda Lima",
    detail: "Enviar merchandising, kit vitrina y capacitación virtual.",
  },
  {
    title: "Alertar sobre top sellers",
    detail: "Layering Aura agotará en 7 días. Proponer alternativa.",
  },
  {
    title: "Live Shopping MX",
    detail: "Documentar playbook. Ticket +21% en la última sesión.",
  },
];

const marginByChannel = [
  { label: "Boutiques", value: 58 },
  { label: "Marketplace", value: 42 },
  { label: "Corners", value: 36 },
  { label: "E-commerce", value: 30 },
];

export default function BackofficePage() {
  const [activeSection, setActiveSection] = useState<string>("overview");

  const renderOverview = () => {
    const maxRevenue = Math.max(...revenueTrend.map((point) => point.amount));
    const revenuePoints = revenueTrend
      .map((point, index) => {
        const x = (index / (revenueTrend.length - 1)) * 100;
        const y = 100 - (point.amount / maxRevenue) * 100;
        return `${x},${y}`;
      })
      .join(" ");

    let start = 0;
    const donutSegments = orderStatusData
      .map((status, index) => {
        const end = start + status.percent;
        const color = ["#f97316", "#fb923c", "#fdba74", "#fed7aa"][index % 4];
        const segment = `${color} ${start}% ${end}%`;
        start = end;
        return segment;
      })
      .join(", ");

    return (
      <div className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((item) => (
            <Card key={item.label} className="border border-slate-200 bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-slate-500">{item.label}</CardTitle>
                <item.icon className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-slate-900">{item.value}</div>
                <p className="text-xs text-emerald-600">{item.delta}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <span>Periodo</span>
            <select className="rounded-lg border border-slate-200 px-3 py-1">
              <option>Últimos 90 días</option>
              <option>Este mes</option>
              <option>Semana actual</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-slate-200 text-slate-700">
              Exportar CSV
            </Button>
            <Button className="bg-slate-900 text-white">
              <BadgeCheck className="mr-2 h-4 w-4" /> Actualizar
            </Button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.8fr_1.1fr]">
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle>Total facturado</CardTitle>
                <CardDescription>Periodo seleccionado · ARS millones</CardDescription>
              </div>
              <div className="text-3xl font-semibold text-slate-900">
                ${" "}
                {revenueTrend.reduce((acc, point) => acc + point.amount, 0).toLocaleString("es-AR")}
                M
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-52 w-full">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#0f172a" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polygon
                    fill="url(#revenueGradient)"
                    points={`0,100 ${revenuePoints} 100,100`}
                  />
                  <polyline
                    fill="none"
                    stroke="#0f172a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    points={revenuePoints}
                  />
                </svg>
                <div className="absolute inset-0 flex items-end justify-between px-1 text-xs text-slate-400">
                  {revenueTrend.map((point) => (
                    <span key={point.month}>{point.month}</span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 bg-white">
            <CardHeader>
              <CardTitle>Estado de pedidos</CardTitle>
              <CardDescription>Distribución por status</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 lg:grid-cols-[1fr_1fr]">
              <div className="flex items-center justify-center">
                <div
                  className="relative h-40 w-40 rounded-full"
                  style={{ background: `conic-gradient(${donutSegments})` }}
                >
                  <div className="absolute inset-[18%] rounded-full bg-white/90 text-center">
                    <p className="pt-8 text-2xl font-semibold text-slate-900">
                      {orderStatusData.reduce((acc, data) => acc + data.total, 0)}
                    </p>
                    <p className="text-xs text-slate-500">Pedidos</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                {orderStatusData.map((status, index) => (
                  <div key={status.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: ["#f97316", "#fb923c", "#fdba74", "#fed7aa"][index % 4],
                        }}
                      />
                      <span className="font-medium text-slate-800">{status.label}</span>
                    </div>
                    <div className="text-right text-slate-500">
                      <p>{status.percent}%</p>
                      <p className="text-xs">{status.total} pedidos</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border border-slate-200 bg-white">
            <CardHeader>
              <CardTitle>Productos vendidos por categoría</CardTitle>
              <CardDescription>Unidades totales últimos 30 días</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {salesByCategory.map((category) => {
                const percentage = Math.round((category.units / salesByCategory[0].units) * 100);
                return (
                  <div key={category.category}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-800">{category.category}</span>
                      <span className="text-slate-500">{category.units} uds</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-gradient-to-r from-slate-900 to-slate-500" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="border border-slate-200 bg-white">
            <CardHeader>
              <CardTitle>Margen por canal</CardTitle>
              <CardDescription>Última semana operativa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {marginByChannel.map((channel) => (
                <div key={channel.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-800">{channel.label}</span>
                    <span className="text-slate-500">{channel.value}%</span>
                  </div>
                  <div className="mt-2 h-16 rounded-2xl border border-slate-100 bg-slate-50">
                    <div
                      className="h-full rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-200 text-right text-xs font-semibold text-emerald-900"
                      style={{ width: `${channel.value}%` }}
                    >
                      <span className="mr-2 align-middle">{channel.value}% margen</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border border-slate-200 bg-white">
            <CardHeader>
              <CardTitle>Alertas de stock</CardTitle>
              <CardDescription>Productos críticos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {lowStockAlerts.map((alert) => (
                <div key={alert.sku} className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2">
                  <div>
                    <p className="font-semibold text-slate-900">{alert.product}</p>
                    <p className="text-xs text-slate-500">SKU {alert.sku} · Depósito {alert.depot}</p>
                  </div>
                  <Badge variant="outline" className="border-amber-300 text-amber-600">
                    {alert.remaining} uds
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-slate-200 bg-white">
            <CardHeader>
              <CardTitle>Pedidos detenidos</CardTitle>
              <CardDescription>Status sin cambios &gt; 24h</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {stuckOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2">
                  <div>
                    <p className="font-semibold text-slate-900">{order.retailer}</p>
                    <p className="text-xs text-slate-500">
                      {order.id} · {order.status}
                    </p>
                  </div>
                  <Badge variant="glow" className="bg-rose-100 text-rose-700">
                    {order.time}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderCatalog = () => (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-slate-900">Productos</h2>
          <p className="text-sm text-slate-500">Filtrá, editá y publicá tu catálogo.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-300 text-slate-800">
            Recomendaciones
          </Button>
          <Button className="bg-slate-900 text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> Nuevo producto
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Categoría</span>
          <select className="rounded-lg border border-slate-200 px-3 py-1">
            <option>Root</option>
            <option>Aros</option>
            <option>Collares</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Acciones</span>
          <select className="rounded-lg border border-slate-200 px-3 py-1">
            <option>Bulk actions</option>
            <option>Activar</option>
            <option>Desactivar</option>
          </select>
        </div>
      </div>
      <Card className="border border-slate-200 bg-white">
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-[12px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {catalogProducts.map((product) => (
                <tr key={product.id} className="border-b border-slate-100 text-slate-700">
                  <td className="px-4 py-3 text-slate-500">{product.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{product.name}</td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">{product.price}</td>
                  <td className="px-4 py-3">{product.quantity}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${product.status ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"}`}>
                      {product.status ? "Activo" : "Pausado"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">Editar</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );

  const renderStock = () => (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-900">Stock por depósito</h2>
        <p className="text-sm text-slate-500">Disponibilidad y reservas activas.</p>
      </div>
      <Card className="border border-slate-200 bg-white">
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3">Depósito</th>
                <th className="px-4 py-3">Ubicación</th>
                <th className="px-4 py-3">Disponible</th>
                <th className="px-4 py-3">Reservado</th>
              </tr>
            </thead>
            <tbody>
              {warehouses.map((warehouse) => (
                <tr key={warehouse.id} className="border-b border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">{warehouse.id}</td>
                  <td className="px-4 py-3">{warehouse.location}</td>
                  <td className="px-4 py-3">{warehouse.available} uds</td>
                  <td className="px-4 py-3 text-amber-600">{warehouse.reserved} uds</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );

  const renderTracking = () => (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-900">Tracking y reclamos</h2>
        <p className="text-sm text-slate-500">Estado de envíos y soporte.</p>
      </div>
      <Card className="border border-slate-200 bg-white">
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3">Pedido</th>
                <th className="px-4 py-3">Retailer</th>
                <th className="px-4 py-3">Carrier</th>
                <th className="px-4 py-3">ETA</th>
                <th className="px-4 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment) => (
                <tr key={shipment.id} className="border-b border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">{shipment.id}</td>
                  <td className="px-4 py-3">{shipment.retailer}</td>
                  <td className="px-4 py-3">{shipment.carrier}</td>
                  <td className="px-4 py-3">{shipment.eta}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="border-slate-300 text-slate-700">
                      {shipment.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotes = () => (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-900">Notas internas</h2>
        <p className="text-sm text-slate-500">Checklist compartido con el equipo.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {notes.map((note) => (
          <Card key={note.title} className="border border-slate-200 bg-white">
            <CardHeader>
              <CardTitle className="text-base">{note.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">{note.detail}</CardContent>
          </Card>
        ))}
        <Card className="border border-slate-200 bg-white">
          <CardHeader>
            <CardTitle>Equipo online</CardTitle>
            <CardDescription>Disponibilidad de asesoras.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Belén · Cono Sur", "Aura · Live Commerce", "Maru · Brasil"].map((advisor) => (
              <div key={advisor} className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-sm">
                <span>{advisor}</span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Online</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return renderOverview();
      case "catalog":
        return renderCatalog();
      case "stock":
        return renderStock();
      case "tracking":
        return renderTracking();
      case "notes":
        return renderNotes();
      default:
        return renderCatalog();
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <aside className="hidden w-64 flex-shrink-0 flex-col bg-slate-900 text-slate-100 lg:flex">
        <div className="border-b border-white/10 px-5 py-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Aurelia</p>
          <p className="text-xl font-semibold">Backoffice</p>
        </div>
        <nav className="flex-1 space-y-1 px-4 py-6">
          {navSections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                  isActive ? "bg-slate-100 text-slate-900" : "text-slate-200 hover:bg-white/10"
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                <Icon className="h-4 w-4" />
                {section.label}
              </button>
            );
          })}
        </nav>
        <div className="border-t border-white/10 px-4 py-4 text-xs text-slate-400">
          <p>¿Necesitás ayuda?</p>
          <Button variant="outline" className="mt-2 w-full border-white/40 text-white hover:bg-white/10">
            <Link href="mailto:hola@aurelia.com">Contactar soporte</Link>
          </Button>
        </div>
      </aside>

      <main className="flex-1 space-y-6 px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Breadcrumb active={activeSection} />
            <p className="text-2xl font-semibold text-slate-900">Panel Operativo</p>
            <p className="text-sm text-slate-500">Seleccioná un módulo para trabajar en detalle.</p>
          </div>
          <div className="flex gap-3 text-sm">
            <Button variant="outline" className="border-slate-300 text-slate-700">
              Descargar reporte
            </Button>
            <Button className="bg-slate-900 text-white">
              <BadgeCheck className="mr-2 h-4 w-4" /> Confirmar pedidos
            </Button>
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  );
}

function Breadcrumb({ active }: { active: string }) {
  const labels: Record<string, string> = {
    overview: "Dashboard",
    catalog: "Catálogo",
    stock: "Stock",
    tracking: "Tracking",
    notes: "Notas",
  };

  return (
    <div className="mb-1 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
      <span>Home</span>
      <span>/</span>
      <span>{labels[active]}</span>
    </div>
  );
}
