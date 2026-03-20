/**
 * Students Table Script
 * Menggunakan DataTables untuk menampilkan data
 */

let studentsTable;

$(document).ready(function() {
    // Initialize DataTable
    studentsTable = $('#studentsTable').DataTable({
        ajax: {
            url: '/api/students',
            dataSrc: 'data'
        },
        columns: [
            {
                data: null,
                render: function(data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            { 
                data: 'nim',
                render: function(data) {
                    return `<span class="badge bg-secondary">${data}</span>`;
                }
            },
            { 
                data: 'nama',
                render: function(data) {
                    return `<strong>${data}</strong>`;
                }
            },
            { data: 'prodi' },
            { 
                data: 'angkatan',
                render: function(data) {
                    return `<span class="badge bg-success">${data}</span>`;
                }
            },
            { 
                data: 'email',
                render: function(data) {
                    return `<small class="text-muted">${data}</small>`;
                }
            },
            {
                data: 'id',
                orderable: false,
                render: function(data) {
                    return `
                        <div class="btn-group btn-group-sm" role="group">
                            <button type="button" class="btn btn-warning btn-action btn-edit" data-id="${data}">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button type="button" class="btn btn-danger btn-action btn-delete" data-id="${data}">
                                <i class="fas fa-trash"></i> Hapus
                            </button>
                        </div>
                    `;
                }
            }
        ],
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/id.json'
        },
        pageLength: 10,
        lengthMenu: [5, 10, 25, 50, 100],
        order: [[1, 'asc']], // Sort by NIM
        responsive: true,
        dom: '<"row"<"col-md-6"l><"col-md-6"f>>rtip',
        createdRow: function(row, data, dataIndex) {
            $(row).addClass('animate__animated animate__fadeIn');
        }
    });

    // Handle Edit Button Click
    $(document).on('click', '.btn-edit', function() {
        const id = $(this).data('id');
        
        $.ajax({
            url: `/api/students/${id}`,
            method: 'GET',
            success: function(response) {
                if (response.success) {
                    const student = response.data;
                    
                    $('#editId').val(student.id);
                    $('#editNim').val(student.nim);
                    $('#editNama').val(student.nama);
                    $('#editProdi').val(student.prodi);
                    $('#editAngkatan').val(student.angkatan);
                    $('#editEmail').val(student.email);
                    
                    $('#editModal').modal('show');
                }
            },
            error: function(xhr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: 'Gagal mengambil data mahasiswa',
                    confirmButtonText: 'OK'
                });
            }
        });
    });

    // Handle Save Edit Button Click
    $('#saveEditBtn').click(function() {
        const id = $('#editId').val();
        const data = {
            nim: $('#editNim').val(),
            nama: $('#editNama').val(),
            prodi: $('#editProdi').val(),
            angkatan: $('#editAngkatan').val(),
            email: $('#editEmail').val()
        };

        // Simple validation
        if (!data.nim || !data.nama || !data.prodi || !data.angkatan || !data.email) {
            Swal.fire({
                icon: 'warning',
                title: 'Peringatan!',
                text: 'Semua field wajib diisi',
                confirmButtonText: 'OK'
            });
            return;
        }

        $.ajax({
            url: `/api/students/${id}`,
            method: 'PUT',
            data: data,
            success: function(response) {
                $('#editModal').modal('hide');
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: response.message,
                    confirmButtonText: 'OK'
                }).then(() => {
                    studentsTable.ajax.reload();
                });
            },
            error: function(xhr) {
                const message = xhr.responseJSON?.message || 'Gagal mengupdate data';
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: message,
                    confirmButtonText: 'OK'
                });
            }
        });
    });

    // Handle Delete Button Click
    $(document).on('click', '.btn-delete', function() {
        const id = $(this).data('id');
        
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `/api/students/${id}`,
                    method: 'DELETE',
                    success: function(response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Berhasil!',
                            text: response.message,
                            confirmButtonText: 'OK'
                        }).then(() => {
                            studentsTable.ajax.reload();
                        });
                    },
                    error: function(xhr) {
                        const message = xhr.responseJSON?.message || 'Gagal menghapus data';
                        Swal.fire({
                            icon: 'error',
                            title: 'Gagal!',
                            text: message,
                            confirmButtonText: 'OK'
                        });
                    }
                });
            }
        });
    });

    // Clear form when modal is closed
    $('#editModal').on('hidden.bs.modal', function() {
        $('#editForm')[0].reset();
    });
});
