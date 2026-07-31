package com.herguardian.app.network;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ApiClient {

    // ── Change this to your backend URL ──
    // Emulator:    http://10.0.2.2:8080/
    // Real device: http://YOUR_PC_IP:8080/
    // Production:  https://your-server.com/
    private static final String BASE_URL = "https://herguardian-production-2950.up.railway.app/";

    private static Retrofit retrofit;

    public static Retrofit getClient(final String token) {

        // ── Add JWT token to every request header ──
        OkHttpClient client = new OkHttpClient.Builder()
                .addInterceptor(chain -> {
                    Request original = chain.request();
                    Request request = original.newBuilder()
                            .header("Authorization", "Bearer " + token)
                            .build();
                    return chain.proceed(request);
                })
                .addInterceptor(
                        new HttpLoggingInterceptor()
                                .setLevel(HttpLoggingInterceptor.Level.BODY)
                )
                .build();

        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        return retrofit;
    }
}