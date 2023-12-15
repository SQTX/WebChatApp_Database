PGDMP      6                {            WebChatApp_DB    16.1    16.0 ;    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            @           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            A           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            B           1262    16402    WebChatApp_DB    DATABASE     q   CREATE DATABASE "WebChatApp_DB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE "WebChatApp_DB";
                postgres    false            �            1259    16416    conversation    TABLE     �   CREATE TABLE public.conversation (
    "convID" integer NOT NULL,
    "userID" integer NOT NULL,
    "friendID" integer NOT NULL,
    "inboxID" integer NOT NULL
);
     DROP TABLE public.conversation;
       public         heap    postgres    false            �            1259    16412    conversation_convID_seq    SEQUENCE     �   CREATE SEQUENCE public."conversation_convID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."conversation_convID_seq";
       public          postgres    false    221            C           0    0    conversation_convID_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."conversation_convID_seq" OWNED BY public.conversation."convID";
          public          postgres    false    217            �            1259    16414    conversation_friendID_seq    SEQUENCE     �   CREATE SEQUENCE public."conversation_friendID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."conversation_friendID_seq";
       public          postgres    false    221            D           0    0    conversation_friendID_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."conversation_friendID_seq" OWNED BY public.conversation."friendID";
          public          postgres    false    219            �            1259    16415    conversation_inboxID_seq    SEQUENCE     �   CREATE SEQUENCE public."conversation_inboxID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."conversation_inboxID_seq";
       public          postgres    false    221            E           0    0    conversation_inboxID_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."conversation_inboxID_seq" OWNED BY public.conversation."inboxID";
          public          postgres    false    220            �            1259    16413    conversation_userID_seq    SEQUENCE     �   CREATE SEQUENCE public."conversation_userID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."conversation_userID_seq";
       public          postgres    false    221            F           0    0    conversation_userID_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."conversation_userID_seq" OWNED BY public.conversation."userID";
          public          postgres    false    218            �            1259    16432    inbox    TABLE     �   CREATE TABLE public.inbox (
    "inboxID" integer NOT NULL,
    "lastSentAuthor" integer,
    "lastMessTime" timestamp with time zone,
    "lastMessText" character varying(4095)
);
    DROP TABLE public.inbox;
       public         heap    postgres    false            �            1259    16430    inbox_inboxID_seq    SEQUENCE     �   CREATE SEQUENCE public."inbox_inboxID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."inbox_inboxID_seq";
       public          postgres    false    224            G           0    0    inbox_inboxID_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."inbox_inboxID_seq" OWNED BY public.inbox."inboxID";
          public          postgres    false    222            �            1259    16431    inbox_lastSentAuthor_seq    SEQUENCE     �   CREATE SEQUENCE public."inbox_lastSentAuthor_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."inbox_lastSentAuthor_seq";
       public          postgres    false    224            H           0    0    inbox_lastSentAuthor_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."inbox_lastSentAuthor_seq" OWNED BY public.inbox."lastSentAuthor";
          public          postgres    false    223            �            1259    16447    message    TABLE     �   CREATE TABLE public.message (
    "messID" integer NOT NULL,
    "authorID" integer NOT NULL,
    "sentAt" timestamp with time zone NOT NULL,
    "messTxt" character varying(4095) NOT NULL
);
    DROP TABLE public.message;
       public         heap    postgres    false            �            1259    16455    message_authorID_seq    SEQUENCE     �   CREATE SEQUENCE public."message_authorID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."message_authorID_seq";
       public          postgres    false    226            I           0    0    message_authorID_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."message_authorID_seq" OWNED BY public.message."authorID";
          public          postgres    false    227            �            1259    16446    message_messID_seq    SEQUENCE     �   CREATE SEQUENCE public."message_messID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."message_messID_seq";
       public          postgres    false    226            J           0    0    message_messID_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."message_messID_seq" OWNED BY public.message."messID";
          public          postgres    false    225            �            1259    16404    user    TABLE     $  CREATE TABLE public."user" (
    "userID" integer NOT NULL,
    firstname character varying(50) NOT NULL,
    lastname character varying(50) NOT NULL,
    "profilePhoto" character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(50) NOT NULL
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    16403    user_tab_userID_seq    SEQUENCE     �   CREATE SEQUENCE public."user_tab_userID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."user_tab_userID_seq";
       public          postgres    false    216            K           0    0    user_tab_userID_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."user_tab_userID_seq" OWNED BY public."user"."userID";
          public          postgres    false    215            �           2604    16419    conversation convID    DEFAULT     ~   ALTER TABLE ONLY public.conversation ALTER COLUMN "convID" SET DEFAULT nextval('public."conversation_convID_seq"'::regclass);
 D   ALTER TABLE public.conversation ALTER COLUMN "convID" DROP DEFAULT;
       public          postgres    false    221    217    221            �           2604    16420    conversation userID    DEFAULT     ~   ALTER TABLE ONLY public.conversation ALTER COLUMN "userID" SET DEFAULT nextval('public."conversation_userID_seq"'::regclass);
 D   ALTER TABLE public.conversation ALTER COLUMN "userID" DROP DEFAULT;
       public          postgres    false    218    221    221            �           2604    16421    conversation friendID    DEFAULT     �   ALTER TABLE ONLY public.conversation ALTER COLUMN "friendID" SET DEFAULT nextval('public."conversation_friendID_seq"'::regclass);
 F   ALTER TABLE public.conversation ALTER COLUMN "friendID" DROP DEFAULT;
       public          postgres    false    219    221    221            �           2604    16422    conversation inboxID    DEFAULT     �   ALTER TABLE ONLY public.conversation ALTER COLUMN "inboxID" SET DEFAULT nextval('public."conversation_inboxID_seq"'::regclass);
 E   ALTER TABLE public.conversation ALTER COLUMN "inboxID" DROP DEFAULT;
       public          postgres    false    221    220    221            �           2604    16435    inbox inboxID    DEFAULT     r   ALTER TABLE ONLY public.inbox ALTER COLUMN "inboxID" SET DEFAULT nextval('public."inbox_inboxID_seq"'::regclass);
 >   ALTER TABLE public.inbox ALTER COLUMN "inboxID" DROP DEFAULT;
       public          postgres    false    222    224    224            �           2604    16436    inbox lastSentAuthor    DEFAULT     �   ALTER TABLE ONLY public.inbox ALTER COLUMN "lastSentAuthor" SET DEFAULT nextval('public."inbox_lastSentAuthor_seq"'::regclass);
 E   ALTER TABLE public.inbox ALTER COLUMN "lastSentAuthor" DROP DEFAULT;
       public          postgres    false    224    223    224            �           2604    16450    message messID    DEFAULT     t   ALTER TABLE ONLY public.message ALTER COLUMN "messID" SET DEFAULT nextval('public."message_messID_seq"'::regclass);
 ?   ALTER TABLE public.message ALTER COLUMN "messID" DROP DEFAULT;
       public          postgres    false    226    225    226            �           2604    16456    message authorID    DEFAULT     x   ALTER TABLE ONLY public.message ALTER COLUMN "authorID" SET DEFAULT nextval('public."message_authorID_seq"'::regclass);
 A   ALTER TABLE public.message ALTER COLUMN "authorID" DROP DEFAULT;
       public          postgres    false    227    226            �           2604    16407    user userID    DEFAULT     t   ALTER TABLE ONLY public."user" ALTER COLUMN "userID" SET DEFAULT nextval('public."user_tab_userID_seq"'::regclass);
 >   ALTER TABLE public."user" ALTER COLUMN "userID" DROP DEFAULT;
       public          postgres    false    216    215    216            6          0    16416    conversation 
   TABLE DATA           Q   COPY public.conversation ("convID", "userID", "friendID", "inboxID") FROM stdin;
    public          postgres    false    221   �C       9          0    16432    inbox 
   TABLE DATA           \   COPY public.inbox ("inboxID", "lastSentAuthor", "lastMessTime", "lastMessText") FROM stdin;
    public          postgres    false    224   �C       ;          0    16447    message 
   TABLE DATA           L   COPY public.message ("messID", "authorID", "sentAt", "messTxt") FROM stdin;
    public          postgres    false    226   D       1          0    16404    user 
   TABLE DATA           `   COPY public."user" ("userID", firstname, lastname, "profilePhoto", email, password) FROM stdin;
    public          postgres    false    216   cD       L           0    0    conversation_convID_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."conversation_convID_seq"', 1, true);
          public          postgres    false    217            M           0    0    conversation_friendID_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."conversation_friendID_seq"', 1, false);
          public          postgres    false    219            N           0    0    conversation_inboxID_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."conversation_inboxID_seq"', 1, false);
          public          postgres    false    220            O           0    0    conversation_userID_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."conversation_userID_seq"', 1, false);
          public          postgres    false    218            P           0    0    inbox_inboxID_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."inbox_inboxID_seq"', 1, true);
          public          postgres    false    222            Q           0    0    inbox_lastSentAuthor_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."inbox_lastSentAuthor_seq"', 1, false);
          public          postgres    false    223            R           0    0    message_authorID_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."message_authorID_seq"', 1, false);
          public          postgres    false    227            S           0    0    message_messID_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."message_messID_seq"', 1, true);
          public          postgres    false    225            T           0    0    user_tab_userID_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."user_tab_userID_seq"', 7, true);
          public          postgres    false    215            �           2606    16424    conversation conversation_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.conversation
    ADD CONSTRAINT conversation_pkey PRIMARY KEY ("convID");
 H   ALTER TABLE ONLY public.conversation DROP CONSTRAINT conversation_pkey;
       public            postgres    false    221            �           2606    16473 
   user email 
   CONSTRAINT     H   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT email UNIQUE (email);
 6   ALTER TABLE ONLY public."user" DROP CONSTRAINT email;
       public            postgres    false    216            �           2606    16475    inbox inbox_lastMessTime_key 
   CONSTRAINT     c   ALTER TABLE ONLY public.inbox
    ADD CONSTRAINT "inbox_lastMessTime_key" UNIQUE ("lastMessTime");
 H   ALTER TABLE ONLY public.inbox DROP CONSTRAINT "inbox_lastMessTime_key";
       public            postgres    false    224            �           2606    16440    inbox inbox_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.inbox
    ADD CONSTRAINT inbox_pkey PRIMARY KEY ("inboxID");
 :   ALTER TABLE ONLY public.inbox DROP CONSTRAINT inbox_pkey;
       public            postgres    false    224            �           2606    16452    message message_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY ("messID");
 >   ALTER TABLE ONLY public.message DROP CONSTRAINT message_pkey;
       public            postgres    false    226            �           2606    16411    user user_tab_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_tab_pkey PRIMARY KEY ("userID");
 >   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_tab_pkey;
       public            postgres    false    216            �           2606    16463    message authorID    FK CONSTRAINT     �   ALTER TABLE ONLY public.message
    ADD CONSTRAINT "authorID" FOREIGN KEY ("authorID") REFERENCES public."user"("userID") NOT VALID;
 <   ALTER TABLE ONLY public.message DROP CONSTRAINT "authorID";
       public          postgres    false    226    216    3475            �           2606    16476    conversation friendID    FK CONSTRAINT     �   ALTER TABLE ONLY public.conversation
    ADD CONSTRAINT "friendID" FOREIGN KEY ("friendID") REFERENCES public."user"("userID") NOT VALID;
 A   ALTER TABLE ONLY public.conversation DROP CONSTRAINT "friendID";
       public          postgres    false    221    216    3475            �           2606    16481    conversation inboxID    FK CONSTRAINT     �   ALTER TABLE ONLY public.conversation
    ADD CONSTRAINT "inboxID" FOREIGN KEY ("inboxID") REFERENCES public.inbox("inboxID") NOT VALID;
 @   ALTER TABLE ONLY public.conversation DROP CONSTRAINT "inboxID";
       public          postgres    false    221    224    3481            �           2606    16441    inbox lastSentAuthor    FK CONSTRAINT     �   ALTER TABLE ONLY public.inbox
    ADD CONSTRAINT "lastSentAuthor" FOREIGN KEY ("lastSentAuthor") REFERENCES public."user"("userID");
 @   ALTER TABLE ONLY public.inbox DROP CONSTRAINT "lastSentAuthor";
       public          postgres    false    216    3475    224            �           2606    16425    conversation userID    FK CONSTRAINT     �   ALTER TABLE ONLY public.conversation
    ADD CONSTRAINT "userID" FOREIGN KEY ("userID") REFERENCES public."user"("userID") NOT VALID;
 ?   ALTER TABLE ONLY public.conversation DROP CONSTRAINT "userID";
       public          postgres    false    216    3475    221            6      x�3�4�4�4����� ��      9   ,   x�3�4�4202�54 "CC+c �60��H��W \1z\\\ ���      ;   7   x�3�4�4202�54 "CC+c �60��J�:2���#�
I�G��r��qqq $�      1   �   x�5�AN�0E��)5*���J��-��놩�k�P�cp�ދ$2��z��^��G8�Y /���[jR����Y�=�#��Ȅ��E����6�4�HA"^}x)��0"����9���WT����A�	�$�@}��ƃ����<����d�v6��;a?mŞT��Z�K��A����̰X�R��Xk�c���Z     