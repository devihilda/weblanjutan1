import { Head, useForm, router } from "@inertiajs/react";
import { dashboard } from "@/routes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEventHandler } from "react";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

interface Props {
    user: User;
}

export default function UserEdit({ user }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name ?? "",
        email: user.email ?? "",
        password: "", // Dikosongkan agar opsional saat edit
        role: user.role ?? "user",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/users/${user.id}`);
    };

    return (
        <>
            <Head title="Edit - User Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-6">
                    <h1 className="text-xl font-bold mb-1">Edit User</h1>
                    <p className="text-sm text-muted-foreground mb-6">
                        Silakan perbarui informasi data pengguna di bawah ini.
                    </p>

                    <form onSubmit={submit} className="space-y-6 w-full">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Nama Lengkap
                            </label>
                            <Input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Masukkan nama lengkap..."
                                className="w-full"
                            />
                            {errors.name && (
                                <span className="text-red-500 text-xs block">
                                    {errors.name}
                                </span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Email
                            </label>
                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                placeholder="nama@example.com"
                                className="w-full"
                            />
                            {errors.email && (
                                <span className="text-red-500 text-xs block">
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Password{" "}
                                <span className="text-muted-foreground text-xs">
                                    (Kosongkan jika tidak ingin mengubah
                                    password)
                                </span>
                            </label>
                            <Input
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="Minimal 8 karakter"
                                className="w-full"
                            />
                            {errors.password && (
                                <span className="text-red-500 text-xs block">
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Role
                            </label>
                            <select
                                value={data.role}
                                onChange={(e) =>
                                    setData("role", e.target.value)
                                }
                                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                <option value="user">User</option>
                                <option value="manager">Manager</option>
                                <option value="admin">Admin</option>
                            </select>
                            {errors.role && (
                                <span className="text-red-500 text-xs block">
                                    {errors.role}
                                </span>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-sidebar-border/70">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.visit("/users")}
                            >
                                Batal
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Perbarui
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

UserEdit.layout = {
    breadcrumbs: [
        {
            title: "User Management",
            href: dashboard(),
        },
        {
            title: "Edit User",
            href: "#",
        },
    ],
};
