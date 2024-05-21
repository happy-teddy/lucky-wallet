import { Address } from '@ton/core';
import { LuckyWallet } from '../wrappers/LuckyWallet'

async function run() {
    let luckyBank = Address.parse('EQBpqnrjhql5jbMLvKocqKFL0_fMQOwCtDQlDCFOiG98WT0C')
    let count = -1
    for (let index = 60000001n; index < 9007199253740990n; index = index + 1n) {

        let walletK1 = await LuckyWallet.fromInit(luckyBank, index)
        let addrK1 = walletK1.address.toString().toLowerCase()
        if (
            addrK1.endsWith('lucky') ||
            addrK1.endsWith('ton') ||
            addrK1.endsWith('gem') ||
            addrK1.endsWith('999') ||
            addrK1.endsWith('777')
        ) console.log('Match: ' + index + ' for luckyBank is ' + addrK1 + ' -> ' + walletK1.address.toString())

        count++
        if (count === 100000) {
            count = 0
            console.log('Index ping: ', index)
        }
    }
}

run()

/*
Пример вывода работы скрипта:

Match: 60009004 for luckyBank is eqadot4a16xc3ms2lztlxk8bpp0xyuyqnxkzw0_fd8uyvgem -> EQADot4A16Xc3Ms2LZtlXk8bPp0XyUyqnxkzw0_FD8uYVGem
Match: 60027698 for luckyBank is eqcujqijxxidlvlqs11afx_vw7ibxtepmlvv1vo8zrxxwton -> EQCUjqijxxidlvLQS11Afx_vw7iBxtEPmlvV1VO8zrxXWTON
Match: 60046598 for luckyBank is eqbcpl42blv2n5y4px5gnxg5hv53c7kpssmdsehusjjhbton -> EQBCPl42blv2n5Y4PX5gNxg5hv53c7KpSsmdSEhUSJJhBtON
Match: 60058661 for luckyBank is eqbz8kmyeehtm2nsmfhrjaknafgv9q7cmkk_uxnlwccq5gem -> EQBz8KMYeEhtm2NSMFHrjAkNafGv9q7CmKK_Uxnlwccq5GeM
Match: 60061901 for luckyBank is eqad4q5wjrf3mcnqm9izc_sh39m5czir9lz-exejrr-amton -> EQAD4q5wJRf3mcNQM9iZC_Sh39m5cZIr9lZ-Exejrr-aMtON
Match: 60065090 for luckyBank is eqahbhsqunmmb1yuj95bh6n_qljcxea2kri0mrhalpr0eton -> EQAHBhSqunMmB1yUJ95bH6n_QljCxea2kRI0mrhALPR0eTon
Index ping:  60100001n
Match: 60126465 for luckyBank is eqccfhvpyjyrchhtdrk6hykjc_cmm_2ju2_dz4nuxnba8gem -> EQCcFhvpYJyRcHhTDrK6HyKjc_cMM_2ju2_Dz4NuxNba8geM
Match: 60153145 for luckyBank is eqbjmtd3131cvonwylxaubsviktycpcufbniay0iaby6ngem -> EQBjmtd3131CVoNWyLXaubSVIKtycpCufbniAY0iAbY6ngem
Match: 60157975 for luckyBank is eqcyxzsmeiaqisq_z6vjuskdjeno5c-_lq8a5j7yq67yiton -> EQCYxZsMeIaqisq_Z6VjUsKdJENO5c-_lq8a5J7YQ67YiToN
Match: 60187011 for luckyBank is eqdb_frwjdvt43qibe3u0j4-xxpl4-trohxbhzr8u_w78ton -> EQDb_frwJDVT43Qibe3u0j4-xxpl4-troHxbHzR8U_w78Ton
Match: 60193831 for luckyBank is eqdk5ub9zdkvrczpq338dbmoo8bkt_mxzvtfv743ayrrpgem -> EQDk5UB9zdkVRCzPq338dbmoo8bKt_MXzVTfV743AyRRPGeM
Match: 60196190 for luckyBank is eqczzs11bq5ktwe1zzbvhbjw2mrn78twm0werba9cozixton -> EQCzZs11bQ5ktwE1zZbvhBJW2MRn78TWM0weRBA9cOzIXTOn
Index ping:  60200001n
Match: 60219610 for luckyBank is eqcmkt0j-b4m2gk63-etesolyzmrltyvt2dzksgikfk4iton -> EQCmkt0j-b4m2gk63-eTEsOLYzMRltYvT2DZkSGiKFK4iTOn
Match: 60245373 for luckyBank is eqculj5j3lgbqe-yfmv2tp-yrj3opd28tf4kutj7bhforgem -> EQCuLJ5j3LGbqe-yfMV2TP-yRJ3OPd28tF4kutj7BhFORGEm
Match: 60261186 for luckyBank is eqbp3fyrxomqgapxyp3g53mucz2gjebhimafw1vukriiyton -> EQBP3FYrxOmQgApxYp3G53muCZ2gjeBHiMaFW1vUkriiytoN
Match: 60284002 for luckyBank is eqdkmpvxtqg1g9zcvv8mjlolkmbwfwzwu0nt6qpfvaiyv999 -> EQDkmPVXtQg1G9zCVv8MjlolKmbwFWZwU0nT6QpFVaIyv999
Index ping:  60300001n
Match: 60304288 for luckyBank is eqb62cdpkxvx7yu_barrtshkdlhpn7ujhkhkvrgr_jev7gem -> EQB62cDPkxvx7yu_BaRrTShKdlhPN7ujhKHKVRGR_JEV7geM
Match: 60314313 for luckyBank is eqc7-mx4dhrmr3wevnzgvfqi1dtpmuazii4hraascbfcston -> EQC7-MX4dhRmR3weVNzGvFQi1DtpMUAZiI4hrAAsCbFCStOn
Match: 60317887 for luckyBank is eqbzzhyvreqrle_kkurdaiz3gzmi-oxyw6derupsdotmjton -> EQBZZhyVREqrlE_KkuRDAiz3gzmI-oxyW6DErUPsdoTmJtOn
Match: 60327188 for luckyBank is eqdo1ybydvbvfmtsvj2uyg2umxbeifqubmqsinu5fhuzzgem -> EQDo1yBydVbVFMTsvJ2uyg2umXbeifQuBMQsinu5FHUzZGeM
Match: 60346481 for luckyBank is eqaeuwnvr_qzedlz7ot_gycnjqt8kdzand-yzsm5x_lmhton -> EQAeUwNVr_QZeDlZ7ot_GycNJqT8kDzanD-yzsm5x_LMhtOn
Match: 60346649 for luckyBank is eqbejonku2dpq8w3a_ekqb3xduh7hjkwkfr53lz4qo1h6gem -> EQBEJoNku2dpQ8W3a_ekqb3XDuh7HJKwKfr53LZ4qo1h6GeM
Match: 60355096 for luckyBank is eqbq9mo03uscfpidvmtbln8_umpi6f-qbyiizgrokxrdrgem -> EQBq9mo03UsCfpIDVmtbLN8_UMPI6f-qBYiIZgRoKXRDrgeM
Match: 60390830 for luckyBank is eqaxmfs3poaekoy9qmrvrecquyauiewmegw571bcemyj_999 -> EQAxmfS3PoAekOY9QMRVrECQUyAuIeWMEGW571BCEmYJ_999
Match: 60395559 for luckyBank is eqbfuq8ixwfc_k9h-h1knvzu93w2k3ww6e56fdokuhd51777 -> EQBFuq8ixwFc_K9H-H1knVzU93W2K3Ww6e56FdokUHd51777
Index ping:  60400001n
Match: 60444257 for luckyBank is eqda5wwdqlojfstion-akw-yawl3itxvjegpp1qdp5v9wgem -> EQDA5wWDqlojFSTiON-akW-yawl3ITxVJEgPp1QDP5V9wgeM
Match: 60444482 for luckyBank is eqd2kt4buy32k0wfmurmdtxljc6gtqwh0bmcp7f65wjnlton -> EQD2kT4bUy32K0WFMURmdtxLJc6GTqWH0bmCP7f65wjnLTon
Match: 60471486 for luckyBank is eqcfbb_kgj9nhceuyr8sfm1q07hogy2n79z7qmzef83ppton -> EQCfbB_KGj9NHcEuyR8sfm1Q07hOgY2n79z7QMzeF83pPTOn
Match: 60481779 for luckyBank is eqdmf8vxnfk0dndv1ck8zx4nprzpt7ed8vdkvqe1sp7ai999 -> EQDmF8VxNfK0DnDV1cK8zX4NpRZpT7eD8vdkvqE1SP7AI999
Match: 60492178 for luckyBank is eqbcwavuaynmgd-ibd_owh9v1a-7ego5cayjovdmhuoqdton -> EQBcwAvuaYNMGD-Ibd_OWh9V1a-7EgO5cAyJoVdMHUoQdToN
Index ping:  60500001n
Match: 60508246 for luckyBank is eqaizy0nxnsvqiki4cvegjiziyjztdnucwxu_iqotxcl6gem -> EQAiZY0nXNSVQIkI4CVeGjIzIYJZTdnUCWXu_iqotxCL6GEM
Match: 60534817 for luckyBank is eqcbhqjcrcllc523urhcm6qczij1whnppfph5ajeglrk7ton -> EQCBHQJcrcLlC523UrhCM6QcZij1WhNppfpH5AjegLrK7tON
Match: 60549874 for luckyBank is eqdohyzx92gkyngzxfwfizao4kvfvwhz9vgjjq-dvpr7qton -> EQDOhYZX92gkYNgzXFWFiZao4kVfvWhZ9vGjjq-dvpR7QtoN
Match: 60551376 for luckyBank is eqddn1l_ejbyydpwudthki-qawai7k7ewnu5ly1xc4zzbgem -> EQDDN1l_EjbyyDPwUdTHki-qAWai7k7eWNU5lY1xc4ZZBGem
Match: 60575244 for luckyBank is eqdbwtx1axacgziz2rmxruj8yzuukj6a1qsialdb3vxmggem -> EQDbwTX1aXacgZiz2rMxrUJ8YZUuKj6a1qsialDb3VxmGgEM
Match: 60596767 for luckyBank is eqdjspo4npxnzq8hwosyavs6zb5q8zecjb5-7da21uynhton -> EQDJsPo4NPxNZq8HWosYaVS6Zb5q8zecJB5-7da21UYNHtoN
Match: 60599514 for luckyBank is eqbaqjuuiptisxvm1v_uyemvbvz7dvamsfwoxodxyk9jq777 -> EQBaQJuUiptIsXVm1v_UYEmVBVZ7DvaMsfwOXODXYk9jQ777
Index ping:  60600001n
Match: 60655865 for luckyBank is eqclc1esbedknhvwljd6gpu5yhqf_xlkrz4dhdhngeftvgem -> EQClC1ESbEDkNHVWLJd6GPu5yHQf_Xlkrz4dHDHnGeFTVgem
Match: 60660792 for luckyBank is eqdu4grvvehqzh5au3vv2tnfsoitnmnmtaijq5edgidnegem -> EQDU4GrVVEhqZh5Au3Vv2TnfSoiTNMnmtaIJQ5edGIdnEgEm
Match: 60671147 for luckyBank is eqcedk2eicb2x-lh2goq509-vjyntghjuwlo1ovrwpk9nton -> EQCedK2EiCB2x-LH2gOq509-vjynTghjUwlo1ovrwpk9NtoN
Match: 60677962 for luckyBank is eqbqalnhjlgafsjtw-oe2-nftroqfztjjcbf2jz4c-oy0ton -> EQBqalnHJLgaFSJtW-OE2-NftrOQFzTjjcBF2jz4c-OY0ToN
Match: 60680798 for luckyBank is eqb6ivmpucgv7lv7sfgy8nq3zeff0eyac0tvdbq9ietdzton -> EQB6IVmpUCgV7lv7SfGy8nQ3ZEFF0eYAc0TvDbQ9iETDzTON
Index ping:  60700001n
Match: 60717412 for luckyBank is eqbj7dxlj5ykxrrk9uqty6e4temhptgz4zxtzjixfxgplton -> EQBJ7DXLJ5YkXRRK9uQTY6E4TemHPTGZ4ZXtZJiXFXGplTOn
Match: 60719016 for luckyBank is eqd0y3n0ar1iwkb4rcanq5kk_9w5xbcquw_tumreuzc0agem -> EQD0Y3N0AR1IwKB4RCAnQ5KK_9W5xBCQUw_TUMReuzC0AGeM
Match: 60726140 for luckyBank is eqalpwrbwu3zce4xchn-q3yw7-kv1iv8m4065xvi61pfdton -> EQALpwRbWU3Zce4Xchn-Q3YW7-kv1iV8M4065XVi61pFdton
Match: 60755957 for luckyBank is eqbyhw8m8k14kxuvmjxadyqwyz9ubiqw6jv1okid6bdo0gem -> EQBYHw8m8K14kXuVmJxADYqWYZ9UbiqW6jV1oKId6Bdo0gEM
Match: 60759230 for luckyBank is eqaalnktz9acnkna1iajqxcqaq_w5tjfm-zjjyeujlmyhgem -> EQAaLnktZ9ACnknA1iajQXcQAq_w5tJfM-ZjjyeUJLmYhgEm
Match: 60763862 for luckyBank is eqdc0nftmb0hr3b7rqbr82rsxcraz3ncztmm_krr9dnlvgem -> EQDC0NfTmb0hR3B7RQBr82RSXcRAz3ncZTMM_KRr9DnLvgEM
Match: 60774197 for luckyBank is eqbzd7vx-gawbcwutxt54oxee0jrts_z6kg9eic8gcxjcton -> EQBZD7vx-GaWBCWUTxT54oxee0jrTS_Z6kg9eic8gCxJcTON
Match: 60774978 for luckyBank is eqdho4seo0dwtfxd4cfqlvwmnjc_59av_nj6uuxkktcfvgem -> EQDhO4SEO0DwtfxD4CFQlVWMnJC_59aV_NJ6UUXKktCFVGEm
Match: 60777700 for luckyBank is eqd8je2-r5liegmruo96h2kkeuoovq9dwzs6egx6rqkfngem -> EQD8jE2-r5lIEGMruO96h2kKeUOOvQ9DWZS6eGX6rqKFngem
Match: 60783069 for luckyBank is eqbn-wtcnsqmviz7t4svxacimw3eqpvpqclmocazyfpw1gem -> EQBn-wTCNsQmVIZ7T4SVXacimW3EQpVPQclmocAzYfPw1gEM
Match: 60793178 for luckyBank is eqdjtiv36qrvu210grbobzdqlooywer6ilu9_n73uualmton -> EQDJTIV36QRVu210GrbobZdQlOOYWeR6ilu9_N73UuAlmton
Index ping:  60800001n
Match: 60804607 for luckyBank is eqabyx46jiokngkqehapc6xv-e_16tyw3as1xuq8bijsnton -> EQAByX46JIoKNGkQeHAPC6xV-E_16tYw3AS1XUQ8bijsNtoN
Match: 60805864 for luckyBank is eqdcaqq0p7bgqdjegotborhkkyc5awucsz0uwjzof9e_ngem -> EQDcAqq0P7BgqDjEgotBORhKkYc5aWUCSz0uWJZOF9E_NgEM
Match: 60809073 for luckyBank is eqdeq2mc57pshmkk_dhk8tr2zdkkot7am8f9h429ntqxvton -> EQDeq2Mc57PshMKk_DHk8tR2ZDkkOt7AM8F9H429ntqXVToN
Match: 60820449 for luckyBank is eqae3jdnkfyfrg4hdnpb4arnwwk-9tuesyftede9altkvton -> EQAe3jDNKfyFRG4HdNPB4ArNwwK-9TUEsyftEDE9alTKvtoN
Match: 60850009 for luckyBank is eqazk7bmhgdiiwq0o0hpch7pd_fh4guwdog_mmk380ak1gem -> EQAZk7BmHgDiiWq0o0HpCh7pD_fh4GUwdOg_MmK380ak1Gem
Match: 60859100 for luckyBank is eqdi1g4mv_4k-meelkktojw2dsllbiuy1r0gh08fbfooy777 -> EQDi1G4mV_4k-MEeLkktOJW2dSLlBiUy1r0Gh08fbFOOy777
Match: 60871804 for luckyBank is eqcwolxauijgocx5gv58yrihkbxc8_hpzdbkz50mx0ncrton -> EQCwoLXauIjgocx5gv58yrihkbxc8_HpZDbKZ50Mx0ncRtOn
Match: 60886160 for luckyBank is eqbkxful8whmbw-ln3knu88mly1bvpvixuqvqynam2dikton -> EQBkXFUL8wHmbW-Ln3kNu88MlY1BVPviXuQVQynAm2dIKtOn
Index ping:  60900001n
Match: 60903321 for luckyBank is eqcjxlugqitdwfqpuonb4ol6tw5uz2lsw3w1yg43_fxidgem -> EQCjxlugQiTdwfqPuonb4Ol6tW5uZ2Lsw3W1YG43_FXidGeM
Match: 60904896 for luckyBank is eqcgytmfodsh-tf7_d3qqezjdceptele0upn8h-ll6srcton -> EQCGytMfodsh-TF7_D3qQEZjdCepTeLE0UPn8h-ll6SrcTON
Match: 60918494 for luckyBank is eqdlookvio3zw9omtn5vg6ekftmxaxi5yefjy2gwryaw7999 -> EQDlooKVIO3Zw9OmTn5vg6EKfTMxAXi5yeFjY2gwRYAW7999
Match: 60928668 for luckyBank is eqdqb1eu4y71mdagreqvejril2sfflptenuzi9eaen5wjton -> EQDqB1eu4y71mDaGReqVeJRIl2sfflpTeNUZI9EAen5WjToN
Match: 60951696 for luckyBank is eqanjbasbnmcz4wxf0xmvchlrv-pzrq9gyjfooqpnhwvcgem -> EQAnJBasbnMcZ4wxf0xMVChlrv-Pzrq9gYJfoOQPnhwvCGem
Match: 60954222 for luckyBank is eqdhny6xgrs0plvamqn0hejb4x6jb3ctv4lozxpomo_rpgem -> EQDHNY6XGrs0pLvAMQN0Hejb4x6jB3ctv4lozXpoMO_Rpgem
Index ping:  61000001n
Match: 61006124 for luckyBank is eqcm39u5s2giiux9am3j25wu0pt8-_vxpr0grnn397mlhgem -> EQCm39u5S2giIUx9Am3j25wu0pt8-_VXpr0GRnN397MlHGem
Match: 61059135 for luckyBank is eqd8dhauwg8b_rhv-ac9lcbil7feyniuglrxqweka5vjngem -> EQD8DHAUWg8b_RHV-AC9lCbIL7feYnIuGLRxQWeKA5VjnGEM
Match: 61059385 for luckyBank is eqbx0_yppfdtysi9hqm744ik2gb63pxt4m-zdqdpl3wxkgem -> EQBx0_YpPFdTYSi9HqM744ik2Gb63PxT4m-zdqDPl3WXKgEm
Match: 61073756 for luckyBank is eqciuforauvuk9sbbgdessezz6injwzuzrcm6gf8t48z5ton -> EQCIufOrAuVUK9sBBgDeSseZz6iNjwZuzRCM6gf8T48Z5toN
Match: 61090995 for luckyBank is eqc6n5ikoynksdx1phleoxcpjax4lnd-l7mhytl1iblypgem -> EQC6n5IkoyNKsDx1PHLeOXcPJaX4Lnd-L7MHytl1iBlYpgem
Index ping:  61100001n
Match: 61104996 for luckyBank is eqay0enmtronw4jsjt0kgkgg4cugcjib4uswuzk07uhpagem -> EQAy0ENmtrOnW4jSJT0KgkGg4cUGcjib4uSWUZk07uHpAgEM
Match: 61109438 for luckyBank is eqczfehjhepcmk2f9uxb5iiqandl5epdyy0ekvssg2affton -> EQCZFehjHEPcMk2f9Uxb5iiqaNdl5ePDYY0ekvSSG2afFtoN
Match: 61113533 for luckyBank is eqbekfcedlbp3h7zciqcyhdajqt9dbehorf7igjpbqe7fgem -> EQBekfcedLBp3h7ZCIQcyHdAJqT9dbehOrF7IGjPbqe7fgEm
Match: 61129410 for luckyBank is eqd4yig8oo2ib_76rv7nasw25oeshxei99g7i8f8p5us9999 -> EQD4Yig8OO2Ib_76rv7NaSw25oesHxei99G7I8f8p5Us9999
Match: 61162393 for luckyBank is eqb8959hzs1u4vtxs3kc6zeames3tvphr_pecqvxpcsa-ton -> EQB8959hzs1U4vtXs3KC6ZeAMeS3TVphr_PecqVXPCsA-ton
Match: 61164640 for luckyBank is eqcgfpflucuxpahtrfmidl6cqb9rsjbpmz7mt-lovd7x8gem -> EQCGFpfLucUXPaHtrfmIDl6cQb9RSjBPMz7Mt-lovd7x8gem
Match: 61187487 for luckyBank is eqacalxsrbh1hb7jymyz0dnukmawdtlyrqhkwa9tw23slgem -> EQACaLXsrBh1hB7jYmYz0DnUKmAwdTlyrQhKWa9TW23sLGEM
Match: 61190943 for luckyBank is eqb4vvuvf9kq-mfs-hx7tswhokxznh2he0srzsxgcjecoton -> EQB4vVuvF9Kq-mfs-Hx7TSWHOKxZNh2hE0sRZSXgcJeCOToN
Match: 61196857 for luckyBank is eqbnfnmxt9bnzpra3iom3pomzdzwwsddznkvaljfk0tlwgem -> EQBNfnMxt9BnzPRa3iom3pomzdzWWSdDZNkVALjfk0TlwGEM
Index ping:  61200001n
Match: 61228804 for luckyBank is eqbg4u_vxd-sxl5dulnu0ttqjs0j-feqbbzxjx84ev2srton -> EQBG4U_Vxd-sxL5DULnu0ttqjs0J-feQBBzXjx84EV2SRTOn
Match: 61242328 for luckyBank is eqbb85u6mwn4xowojfjw8ppl_zl1xvjqe1dzghd3pj6gtgem -> EQBb85u6mWn4xoWOjfjW8ppl_zl1xVJqE1DZghd3Pj6GtGem
Match: 61245371 for luckyBank is eqbg-rqy4okoix3ldluwrso1adxexrc4upshzobogypotgem -> EQBg-rqy4OkOIX3LDlUWrSo1aDXEXrc4UpShZobOGYpOTgEm
Match: 61262300 for luckyBank is eqazsvcpvcmyhhfffiw2x8q-_lldjzgyla1h44iip7kbigem -> EQAzsvCPvcmYHhFfFIw2X8q-_lldJzgylA1H44iIp7kbigem
Match: 61279362 for luckyBank is eqa2rl7t2umbw19dzahs3ra4amdhxhjsbg3ugts8i-l20ton -> EQA2RL7T2umbW19DZaHS3RA4aMDhxhJsBG3uGTS8I-L20toN
Index ping:  61300001n
Match: 61319427 for luckyBank is eqc9ufm1pgwbi8tqgj2avjafjaqadfg7wotxeyzl0pjciton -> EQC9UFM1pgwbI8TqGj2aVJaFJAQADfG7WotXEYZl0PjCitoN
Match: 61375917 for luckyBank is eqcahrlkwormwpkakuhl-uakc9cqerkqjbfgp4-gte1moton -> EQCAHrlkwORmwpkAKUhL-uaKc9CqErKQjBFgP4-GTE1Moton
Index ping:  61400001n
Match: 61400746 for luckyBank is eqalzrgn2e66uauoomz0ingkftn3vnd7ympwvhr0ihvligem -> EQALzRGN2E66uauOoMZ0IngkFtn3VNd7ympWvhR0Ihvligem
Match: 61410792 for luckyBank is eqdqe3hoy1njhmoppp6bss7plaptnu0528z3msvtp7ogo777 -> EQDQe3hoy1nJHMoPPP6BSs7pLaptnu0528Z3msvTp7ogo777
Match: 61425745 for luckyBank is eqd72pjrnqffuizjlhpbcijwesuqs3vkn71hi0sfid1vnton -> EQD72PjrNqFFUizjlhpBCIjwesuqs3vKn71Hi0sFid1vNToN
Match: 61443464 for luckyBank is eqcqbyabu0ycgx4jvp0p53lw3ceo6_sixhkfv5pb4wmvtgem -> EQCQBYAbu0YCGX4jVP0p53lw3ceO6_SixhKfV5PB4WMvTgeM
Match: 61452653 for luckyBank is eqbxwj48xijvp1j8ox5tha7pypizcehepbuf07kefisyb777 -> EQBXwJ48xIjVP1J8OX5tHA7PYPizcehepBuF07keFiSYB777
Match: 61457438 for luckyBank is eqbeaunx9movz2iwn5x5o5pt1tj6n8byf_ppb6o0r_gq8ton -> EQBEAuNX9MovZ2IWn5X5o5pt1Tj6n8BYf_pPB6o0R_Gq8TON
Match: 61462263 for luckyBank is eqdh2v-wafusixwxyl6kfdmlitmncxlw1xyjgfo56xwozgem -> EQDh2V-WafuSIxwxyl6kfDmLITMNcXLw1xyjGfO56xWOZGem
Match: 61464816 for luckyBank is eqagn3vrc9ycdojgptoubgjyrjva95otgllgo5fuz7154gem -> EQAGn3VrC9YcdOJgpTOubgjyrJVA95OTGlLgo5Fuz7154gem
Match: 61472241 for luckyBank is eqcs-u7u-yqtcwrzb-yvzpfv-lxphfpsqeq2ftkcfgvq8ton -> EQCs-u7U-YQTCWRZB-YvzpFV-LXPhFpSqeq2ftkCfgvq8ton
Index ping:  61500001n
*/