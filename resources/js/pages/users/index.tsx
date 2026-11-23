import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    e_url: string;
    d_url: string;
};

interface Props {
    users: {
        data: User[];
    };
    filter: {
        search: string;
    };
    c_url: string;
    totalUsers: number;
}

export default function UserIndex({ users, filter, c_url, totalUsers }: Props) {
    const [search, setSearch] = useState(filter?.search ?? "");
    const userList = Array.isArray(users?.data) ? users.data : [];

    return (
        <>
            <Head title="Manajemen User" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 bg-white md:min-h-min dark:border-sidebar-border p-6">
                    <h1 className="text-xl font-bold mb-1">Daftar User</h1>

                    <p className="text-sm text-muted-foreground mb-4">
                        Total User: {totalUsers ?? userList.length}
                    </p>

                    <div className="flex justify-between items-center mb-4 gap-4">
                        <Input
                            value={search}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSearch(value);
                                router.get(
                                    c_url,
                                    { search: value },
                                    { preserveState: true, replace: true },
                                );
                            }}
                            placeholder="Cari user"
                            className="max-w-md flex-1"
                        />

                        <Button onClick={() => router.visit("/users/create")}>
                            + Tambah User
                        </Button>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-14">No</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="text-center">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userList.length > 0 ? (
                                userList.map((user, idx) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{idx + 1}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell className="text-center">
                                            <div className="inline-flex items-center justify-center gap-2">
                                                <Link
                                                    href={user.e_url}
                                                    className="inline-flex items-center bg-amber-400 hover:bg-amber-500 text-slate-900 font-medium px-3 py-1.5 rounded-md text-xs transition"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                `Apakah Anda yakin ingin menghapus user ${user.name}?`,
                                                            )
                                                        ) {
                                                            router.delete(
                                                                user.d_url,
                                                            );
                                                        }
                                                    }}
                                                    className="inline-flex items-center bg-rose-600 hover:bg-rose-700 text-white font-medium px-3 py-1.5 rounded-md text-xs transition cursor-pointer"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center py-6 text-slate-400 italic"
                                    >
                                        Data user belum tersedia.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}
