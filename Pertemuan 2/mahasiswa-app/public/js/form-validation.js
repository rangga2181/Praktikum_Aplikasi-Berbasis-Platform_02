/**
 * Form Validation Script
 * Menggunakan jQuery Validation Plugin
 */

$(document).ready(function() {
    $('#studentForm').validate({
        rules: {
            nim: {
                required: true,
                minlength: 7,
                maxlength: 10,
                number: true
            },
            nama: {
                required: true,
                minlength: 3,
                maxlength: 100
            },
            prodi: {
                required: true
            },
            angkatan: {
                required: true
            },
            email: {
                required: true,
                email: true,
                maxlength: 100
            }
        },
        messages: {
            nim: {
                required: 'NIM wajib diisi',
                minlength: 'NIM minimal 7 karakter',
                maxlength: 'NIM maksimal 10 karakter',
                number: 'NIM harus berupa angka'
            },
            nama: {
                required: 'Nama lengkap wajib diisi',
                minlength: 'Nama minimal 3 karakter',
                maxlength: 'Nama maksimal 100 karakter'
            },
            prodi: {
                required: 'Program studi wajib dipilih'
            },
            angkatan: {
                required: 'Angkatan wajib dipilih'
            },
            email: {
                required: 'Email wajib diisi',
                email: 'Format email tidak valid',
                maxlength: 'Email maksimal 100 karakter'
            }
        },
        errorElement: 'div',
        errorClass: 'error-message',
        errorPlacement: function(error, element) {
            element.addClass('is-invalid');
            error.insertAfter(element);
        },
        highlight: function(element) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function(element) {
            $(element).removeClass('is-invalid');
        },
        submitHandler: function(form) {
            const isEdit = $(form).data('edit');
            const id = $(form).data('id');
            const url = isEdit ? `/api/students/${id}` : '/api/students';
            const method = isEdit ? 'PUT' : 'POST';

            $.ajax({
                url: url,
                method: method,
                data: $(form).serialize(),
                success: function(response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil!',
                        text: response.message,
                        confirmButtonText: 'OK'
                    }).then(() => {
                        window.location.href = '/students';
                    });
                },
                error: function(xhr) {
                    const message = xhr.responseJSON?.message || 'Terjadi kesalahan';
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
