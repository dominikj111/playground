use criterion_benchmarking::{zeros_matrix_ai_version, zeros_matrix_my_version};
use criterion::{black_box, criterion_group, criterion_main, Criterion};

fn criterion_benchmark(c: &mut Criterion) {
    
    let matrix_1 = vec![
        vec![1, 1, 1, 1, 1, 1, 1],
        vec![1, 0, 1, 1, 1, 1, 1],
        vec![1, 1, 1, 1, 1, 1, 1],
        vec![1, 1, 1, 1, 0, 1, 1],
        vec![1, 1, 1, 1, 0, 1, 1],
        vec![1, 1, 0, 1, 1, 1, 1],
        vec![1, 1, 1, 1, 1, 1, 0],
    ];

    c.bench_function("my_version", |b| b.iter(|| {
        zeros_matrix_my_version(black_box(matrix_1.clone().as_mut()));
    }));

    let matrix_2 = vec![
        vec![1, 1, 1, 1, 1, 1, 1],
        vec![1, 0, 1, 1, 1, 1, 1],
        vec![1, 1, 1, 1, 1, 1, 1],
        vec![1, 1, 1, 1, 0, 1, 1],
        vec![1, 1, 1, 1, 0, 1, 1],
        vec![1, 1, 0, 1, 1, 1, 1],
        vec![1, 1, 1, 1, 1, 1, 0],
    ];

    c.bench_function("ai_version", |b| b.iter(|| {
        zeros_matrix_ai_version(black_box(matrix_2.clone().as_mut()));
    }));
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);
